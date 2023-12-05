import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RtPayload } from 'src/auth/types';

export const GetUserInfoFromRtPayload = createParamDecorator(
  (data: keyof RtPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    //TODO check if RtGuard is present in the request pipeline
    //TODO if not throw error, same with isPublic and AtPayload getter
    const user = request.user as RtPayload;

    if (!data) {
      return user;
    }

    if (!user) {
      console.error('GetUserInfoFromRtPayload: user is undefined');
    }
    if (!user[data]) {
      console.error(`GetUserInfoFromRtPayload: user.${data} is undefined`);
    }

    return user?.[data];
  }
);
