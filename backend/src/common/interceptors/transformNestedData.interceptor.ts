import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map } from 'rxjs';

@Injectable()
export class TransformNestedDataInterceptor<T> implements NestInterceptor {
  constructor(private readonly classToUse: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return {
          ...data,
          data: plainToInstance(this.classToUse, data.data)
        };
      })
    );
  }
}
