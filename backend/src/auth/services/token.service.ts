import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
import { CookieOptions } from 'express';
import { Config } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Tokens } from '../types';
import { PasswordService } from './password.service';

@Injectable()
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
    tokens,
    remember
  }: {
    user: User & {
      refreshTokens: RefreshToken[];
    };
    tokens: Tokens;
    remember: boolean;
  }) {
    const { refresh_token: newRefreshToken } = tokens;
    const sortedUserRefreshTokens = user.refreshTokens.sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
    );

    if (sortedUserRefreshTokens.length === 6) {
      return this.prisma.refreshToken.update({
        where: {
          userId_refreshToken: {
            refreshToken: sortedUserRefreshTokens[0].refreshToken,
            userId: user.id
          }
        },
        data: {
          refreshToken: newRefreshToken,
          remember
        }
      });
    }
    return this.insertRefreshToken({
      userId: user.id,
      refreshToken: newRefreshToken,
      remember
    });
  }
  public replaceRefreshToken({
    userId,
    oldRefreshToken,
    newRefreshToken,
    remember
  }: {
    userId: string;
    oldRefreshToken: string;
    newRefreshToken: string;
    remember: boolean;
  }) {
    return this.prisma.refreshToken.update({
      where: {
        userId_refreshToken: {
          userId,
          refreshToken: oldRefreshToken
        }
      },
      data: {
        remember,
        refreshToken: newRefreshToken
      }
    });
  }

  public insertRefreshToken({
    userId,
    refreshToken,
    remember
  }: {
    userId: string;
    refreshToken: string;
    remember: boolean;
  }) {
    return this.prisma.refreshToken.create({
      data: {
        refreshToken,
        userId,
        remember
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
  private async signToken({
    sub,
    secret,
    expiresIn
  }: {
    sub: string;
    secret: string;
    expiresIn: string;
  }) {
    return this.jwtService.signAsync(
      {
        sub,
        jti: uuidv4()
      },
      {
        secret,
        expiresIn
      }
    );
  }

  public async signTokensForUser(userId: string) {
    const signAccessToken = this.signToken({
      sub: userId,
      secret: this.configService.get('atSecret'),
      expiresIn: this.configService.get('atExpiresIn')
    });
    const signRefreshToken = this.signToken({
      sub: userId,
      secret: this.configService.get('rtSecret'),
      expiresIn: this.configService.get('rtExpiresIn')
    });

    const [access_token, refresh_token] = await Promise.all([signAccessToken, signRefreshToken]);

    return { access_token, refresh_token };
  }

  public getResponseRtCookieOptions(remember: boolean): CookieOptions {
    const baseOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax'
    };
    return remember
      ? {
          ...baseOptions,
          maxAge: this.configService.get('rtMaxAge')
        }
      : baseOptions;
  }
}
