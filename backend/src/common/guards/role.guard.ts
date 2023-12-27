import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { AtPayload } from 'src/auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: AtPayload = request.user;
    const userId = user.sub;

    const userInDb = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      select: {
        role: true
      }
    });

    if (!userInDb) {
      return false;
    }

    const hasRole = roles.includes(userInDb.role);

    return hasRole;
  }
}
