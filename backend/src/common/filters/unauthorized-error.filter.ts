import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/auth/constants/jwt';

@Catch(UnauthorizedException)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

    const statusCode = exception.getStatus();
    const message = exception.message;

    response.status(statusCode).json({
      statusCode,
      message
    });
  }
}
