// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryConflictError } from '../conflict/conflict.error';
import { CategoryInUseError } from '../conflict/in-use.error.ts';

@Catch(CategoryConflictError, CategoryInUseError)
export class CategoryExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 400; // default status code is 400, bad request
    if (exception instanceof CategoryConflictError) {
      status = 409; //conflict
    } else if (exception instanceof CategoryInUseError) {
      status = 422; //unprocessable entity
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
