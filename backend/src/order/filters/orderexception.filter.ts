// src/common/filters/http-exception.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { InsufficientQuantityError } from '../errors/insufficient-quantity.error';
import { InvalidCartItemsError } from '../errors/invalid-cartitems.error';
import { ProductNotFoundError } from '../errors/product-notfound.error';

@Catch(InsufficientQuantityError, InvalidCartItemsError, ProductNotFoundError)
export class OrderExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 400; // default status code is 400, bad request
    if (exception instanceof ProductNotFoundError) {
      status = 404; //not found
    } else if (exception instanceof InsufficientQuantityError) {
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
