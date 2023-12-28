// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class ProductPrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message: string;

    let status = 400; // default status code is 400, bad request
    switch (exception.code) {
      case 'P2002':
        status = 409;
        message = 'A product must be unique';
        break;
      //product not found
      case 'P2025':
        status = 404;
        message = 'Product not found';
        break;
      default:
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception.name,
      message: message ?? exception.message
    });
  }
}
