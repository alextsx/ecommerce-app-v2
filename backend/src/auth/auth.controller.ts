import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Config } from 'src/config';
import { AuthDto } from './dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  private readonly rtCookieName: string;
  private readonly rtMaxAge: number;
  constructor(
    private authService: AuthService,
    private configService: ConfigService<Config>
  ) {
    this.rtCookieName = configService.get('rtCookieName');
    this.rtMaxAge = configService.get('rtMaxAge');
  }

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

    response.cookie(this.rtCookieName, refresh_token, {
      httpOnly: true,
      maxAge: this.rtMaxAge,
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

    response.cookie(this.rtCookieName, refresh_token, {
      httpOnly: true,
      maxAge: this.rtMaxAge,
      sameSite: 'strict',
      secure: true
    });

    response.send({ access_token });
  }
}
