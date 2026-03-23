import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user.entity';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // "@Roles()에서 설정한 값 가져오기"

    if (!roles) return true; //권한 설정 없으면 그냥 통과

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;

    return !!(
      user && //user가 null이 아니고,
      user.authorities && //user authorities가 null이 아니고,
      user.authorities.some((role) => roles.includes(role.authorityName)) // role.authorityName이 포함되어야 true 반환
    );
  }
}
