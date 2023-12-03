import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs';
import { UserDto } from 'src/user/dtos/user.dto';
import { ReviewDto } from '../dtos/review.dto';

@Injectable()
export class TransformReviewsResponse implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const newData = {
          ...data,
          data: plainToInstance(ReviewDto, data.data)
        };
        newData.data = newData.data.map((item) => {
          if (item.user) {
            item.user = plainToInstance(UserDto, item.user);
            if (item.user.UserDetails) {
              item.user = {
                ...item.user,
                ...item.user.UserDetails
              };
              delete item.user.UserDetails;
            }
          }
          return item;
        });
        return newData;
      })
    );
  }
}
