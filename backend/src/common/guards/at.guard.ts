import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_META_KEY } from '../decorators';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_META_KEY, [
      context.getHandler(), //first look for it in controller handler
      context.getClass() //then look for it in controller class
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
