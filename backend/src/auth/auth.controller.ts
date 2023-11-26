import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE } from './constants/jwt';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto) {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() dto: AuthDto, @Res() response: Response) {
    const { access_token, refresh_token } = await this.authService.signInLocal(dto);

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
      sameSite: 'strict',
      secure: true
    });

    response.send({ access_token });
  }

  @Post('logout')
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUser('id') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    return this.authService.logout({ userId, refreshToken });
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUser('id') userId: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, refresh_token } = await this.authService.refreshTokens({
      userId,
      refreshToken
    });

    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_MAX_AGE,
      sameSite: 'strict',
      secure: true
    });

    response.send({ access_token });
  }
}
