import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AtPayload } from 'src/auth/types';

export const GetUserInfoFromAtPayload = createParamDecorator(
  (data: keyof AtPayload, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user as AtPayload;

    if (!data) {
      return user;
    }

    if (!user) {
      console.error('GetUserInfoFromAtPayload: user is undefined');
    }
    if (!user[data]) {
      console.error(`GetUserInfoFromAtPayload: user.${data} is undefined`);
    }

    return user?.[data];
  }
);
