import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
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
    tokens
  }: {
    user: User & {
      refreshTokens: RefreshToken[];
    };
    tokens: Tokens;
  }) {
    const { refresh_token: newRefreshToken } = tokens;
    const sortedUserRefreshTokens = user.refreshTokens.sort(
      (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
    );

    if (sortedUserRefreshTokens.length === 6) {
      return this.prisma.refreshToken.update({
        where: {
          refreshToken: sortedUserRefreshTokens[0].refreshToken
        },
        data: {
          refreshToken: newRefreshToken
        }
      });
    }
    return this.insertRefreshToken({
      userId: user.id,
      refreshToken: newRefreshToken
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
}
