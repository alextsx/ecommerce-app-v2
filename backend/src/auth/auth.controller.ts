import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GetUserInfoFromAtPayload, GetUserInfoFromRtPayload, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Config } from 'src/config';
import { LoginDto, RegistrationDto } from './dtos/auth.dto';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Controller('auth')
export class AuthController {
  private readonly rtCookieName: string;
  private readonly rtMaxAge: number;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private configService: ConfigService<Config>
  ) {
    this.rtCookieName = configService.get('rtCookieName');
    this.rtMaxAge = configService.get('rtMaxAge');
  }

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: RegistrationDto) {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() dto: LoginDto, @Res() response: Response) {
    const { access_token, refresh_token } = await this.authService.signInLocal(dto);
    const { remember } = dto;
    const cookieOptions = this.tokenService.getResponseRtCookieOptions(remember);

    response.cookie(this.rtCookieName, refresh_token, cookieOptions);

    response.send({ access_token });
  }

  @Post('logout')
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUserInfoFromRtPayload('sub') userId: string,
    @GetUserInfoFromRtPayload('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) response: Response
  ) {
    await this.authService.logout({ userId, refreshToken });

    response.cookie(this.rtCookieName, '', {
      httpOnly: true,
      maxAge: 0
    });

    response.send();
  }

  @Post('refresh')
  @UseGuards(RtGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetUserInfoFromRtPayload('refreshToken') refreshToken: string,
    @GetUserInfoFromRtPayload('sub') userId: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, refresh_token, remember } = await this.authService.refreshTokens({
      userId,
      refreshToken
    });
    const cookieOptions = this.tokenService.getResponseRtCookieOptions(remember);

    response.cookie(this.rtCookieName, refresh_token, cookieOptions);

    response.send({ access_token });
  }

  @Get('who')
  @HttpCode(HttpStatus.OK)
  async getAuthenticatedUser(@GetUserInfoFromAtPayload('sub') userId: string) {
    return this.authService.getAuthenticatedUser({ userId });
  }
}
