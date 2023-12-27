// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { InvalidSignatureError } from '../errors/invalid-signature.error';

@Catch(InvalidSignatureError)
export class InvalidSignatureExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 400;
    if (exception instanceof InvalidSignatureError) {
      status = 401; //unauthorized
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.name,
      message: exception.message
    });
  }
}
