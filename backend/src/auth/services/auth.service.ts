import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InvalidRefreshTokenException } from 'src/common/exceptions/invalid-refreshtoken.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegistrationDto } from '../dtos/auth.dto';
import { Tokens } from '../types';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async signInLocal(dto: LoginDto): Promise<Tokens> {
    const user = await this.findUserByEmailWithRefreshTokens(dto.email);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    await this.passwordService.checkCredentials({
      providedPassword: dto.password,
      hashedPassword: user.password
    });

    const tokens = await this.tokenService.signTokensForUser(user.id);

    await this.tokenService.updateOrInsertRefreshToken({
      user,
      tokens,
      remember: dto.remember
    });

    return tokens;
  }

  async signupLocal(dto: RegistrationDto) {
    const foundUser = await this.findUserByEmail(dto.email);
    if (foundUser) {
      throw new ConflictException('Email already exists');
    }

    const hash = await this.passwordService.hashPassword(dto.password);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        UserDetails: {
          create: {
            firstName: dto.first_name,
            lastName: dto.last_name
          }
        }
      },
      include: {
        UserDetails: true
      }
    });
  }

  async logout({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    await this.prisma.refreshToken.delete({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken
        }
      }
    });
  }

  async refreshTokens({ userId, refreshToken }: { userId: string; refreshToken: string }) {
    const foundRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken
        }
      },
      include: {
        user: true
      }
    });

    if (!foundRefreshToken) {
      throw new InvalidRefreshTokenException();
    }

    //TODO new expiration date should be calculated based on the old one, not hardcoded
    const newTokens = await this.tokenService.signTokensForUser(userId);

    await this.tokenService.replaceRefreshToken({
      userId,
      oldRefreshToken: refreshToken,
      newRefreshToken: newTokens.refresh_token,
      remember: foundRefreshToken.remember
    });

    return {
      access_token: newTokens.access_token,
      refresh_token: newTokens.refresh_token,
      remember: foundRefreshToken.remember
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

  private findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async getAuthenticatedUser({ userId }: { userId: string }) {
    return this.prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        role: true
      }
    });
  }
}
