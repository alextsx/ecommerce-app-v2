import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAccessToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;
    const accessToken = authHeader.split(' ')[1];
    return accessToken;
  }
);
