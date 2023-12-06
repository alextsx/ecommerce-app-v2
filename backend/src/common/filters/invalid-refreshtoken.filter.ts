import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Config } from 'src/config';
import { InvalidRefreshTokenException } from '../exceptions/invalid-refreshtoken.exception';

@Catch(InvalidRefreshTokenException)
export class InvalidRefreshTokenExceptionFilter implements ExceptionFilter {
  public constructor(private configService: ConfigService<Config>) {}
  catch(exception: InvalidRefreshTokenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    response.clearCookie(this.configService.get('rtCookieName'));

    const statusCode = exception.getStatus();
    const message = exception.message;

    response.status(statusCode).json({
      statusCode,
      message
    });
  }
}
