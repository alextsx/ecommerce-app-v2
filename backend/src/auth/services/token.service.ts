import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
import { Config } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tokens } from '../types';
import { PasswordService } from './password.service';

export class TokenService {
  public constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService<Config>,
    private passwordService: PasswordService
  ) {}

  /* 
    This method either updates or inserts based on how many refresh tokens the user has.
    (aka active sessions)
    If the user has 6 active sessions, it will replace the oldest one.
  */
  public updateOrInsertRefreshToken({
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
  public replaceRefreshToken({ userId, oldRefreshToken, newRefreshToken }) {
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

  public insertRefreshToken({ userId, refreshToken }) {
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

  public async signTokensForUser(userId: string) {
    const accessTokenPromise = this.jwtService.signAsync(
      {
        sub: userId
      },
      {
        secret: this.configService.get('atSecret'),
        expiresIn: this.configService.get('atExpiresIn')
      }
    );
    const refreshTokenPromise = this.jwtService.signAsync(
      {
        sub: userId
      },
      {
        secret: this.configService.get('rtSecret'),
        expiresIn: this.configService.get('rtExpiresIn')
      }
    );
    const [at, rt] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

    return {
      access_token: at,
      refresh_token: rt
    };
  }
}
