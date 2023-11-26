import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { REFRESH_TOKEN_COOKIE_NAME } from '../constants/jwt';
import { JwtPayload } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: (req) => req.cookies?.[REFRESH_TOKEN_COOKIE_NAME],
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('rtSecret')
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME];

    const { sub } = payload;

    const foundRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId: sub,
        refreshToken
      }
    });

    //refresh token reuse
    if (!foundRefreshToken) {
      await this.authService.deleteEveryRefreshTokenByUserId(sub);
      throw new UnauthorizedException('Access denied');
    }

    return {
      ...payload,
      refreshToken
    };
  }
}
