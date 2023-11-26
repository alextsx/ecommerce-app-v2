import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from '../constants/jwt';
import { AuthDto } from '../dto';
import { Tokens } from '../types';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private passwordService: PasswordService
  ) {}

  async signInLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.findUserByEmailWithRefreshTokens(dto.email);
    if (!user) {
      throw new UnauthorizedException('Access denied');
    }

    await this.passwordService.checkCredentials({
      providedPassword: dto.password,
      hashedPassword: user.password
    });

    const tokens = await this.signTokensForUser(user.id);

    await this.updateOrInsertRefreshToken({
      user,
      tokens
    });

    return tokens;
  }

  async signupLocal(dto: AuthDto) {
    const hash = await this.passwordService.hashPassword(dto.password);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash
      }
    });
  }

  async logout({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    await this.prisma.refreshToken.delete({
      where: {
        userId,
        refreshToken
      }
    });
  }

  async refreshTokens({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    const foundRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId,
        refreshToken
      },
      include: {
        user: true
      }
    });

    if (!foundRefreshToken) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.signTokensForUser(userId);

    await this.replaceRefreshToken({
      userId,
      oldRefreshToken: refreshToken,
      newRefreshToken: tokens.refresh_token
    });

    return tokens;
  }

  private async updateOrInsertRefreshToken({
    user,
    tokens
  }: {
    user: User & {
      refreshTokens: RefreshToken[];
    };
    tokens: Tokens;
  }) {
    const { refresh_token } = tokens;
    const sortedUserRefreshTokens = user.refreshTokens.sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
    );

    if (sortedUserRefreshTokens.length === 6) {
      return this.prisma.refreshToken.update({
        where: {
          refreshToken: sortedUserRefreshTokens[0].refreshToken
        },
        data: {
          refreshToken: refresh_token
        }
      });
    }
    return this.insertRefreshToken({
      userId: user.id,
      refreshToken: refresh_token
    });
  }
  private replaceRefreshToken({ userId, oldRefreshToken, newRefreshToken }) {
    return this.prisma.refreshToken.update({
      where: {
        userId,
        refreshToken: oldRefreshToken
      },
      data: {
        refreshToken: newRefreshToken
      }
    });
  }

  private insertRefreshToken({ userId, refreshToken }) {
    return this.prisma.refreshToken.create({
      data: {
        refreshToken,
        userId
      }
    });
  }

  public deleteEveryRefreshTokenByUserId(userId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: {
        userId
      }
    });
  }

  private async signTokensForUser(userId: string) {
    const accessTokenPromise = this.jwtService.signAsync(
      {
        sub: userId
      },
      {
        secret: this.configService.get('atSecret'),
        expiresIn: ACCESS_TOKEN_MAX_AGE
      }
    );
    const refreshTokenPromise = this.jwtService.signAsync(
      {
        sub: userId
      },
      {
        secret: this.configService.get('rtSecret'),
        expiresIn: REFRESH_TOKEN_MAX_AGE
      }
    );
    const [at, rt] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

    return {
      access_token: at,
      refresh_token: rt
    };
  }

  private findUserByEmailWithRefreshTokens(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        refreshTokens: true
      }
    });
  }
}
