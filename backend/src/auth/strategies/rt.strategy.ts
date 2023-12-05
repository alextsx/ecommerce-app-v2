import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { Config } from 'src/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from '../services/token.service';
import { JwtBasePayload } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly rtCookieName: string;
  constructor(
    private configService: ConfigService<Config>,
    private prisma: PrismaService,
    private tokenService: TokenService
  ) {
    const rtCookieName = configService.get('rtCookieName');
    super({
      jwtFromRequest: (req) => req.cookies?.[rtCookieName],
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('rtSecret')
    });
    this.rtCookieName = rtCookieName;
  }

  async validate(req: Request, payload: JwtBasePayload) {
    const refreshToken = req.cookies?.[this.rtCookieName];
    console.log(`sub ${payload.sub} refreshToken ${refreshToken}`);

    const { sub } = payload;

    const foundRefreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        userId: sub,
        refreshToken
      }
    });

    //refresh token reuse
    if (!foundRefreshToken) {
      await this.tokenService.deleteEveryRefreshTokenByUserId(sub);
      throw new UnauthorizedException('Access denied');
    }

    return {
      ...payload,
      refreshToken
    };
  }
}
