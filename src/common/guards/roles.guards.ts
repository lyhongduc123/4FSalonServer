import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators';
import { User } from '../../modules/users/entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user }: { user: User } = request;
    console.log(user);
    if (request.headers['manager_branch_id']) {
      context.switchToHttp().getRequest().user = { ...user, branch_id: Number(request.headers['manager_branch_id']) };
    } else {
      context.switchToHttp().getRequest().user = { ...user, branch_id: null };
    }
    
    return requiredRoles.some((role) => user.role === role);
  }
}
