import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";

@Injectable()
export class DemoRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const requiredRoles = this.reflector.get<string[]>("roles",
      context.getHandler());

    //console.log("required role guard info:", requiredRoles, context.getHandler());

    // no need to check
    if(!requiredRoles) {
      return true;
    }

    const {user} = request;
    const hasRole = () => user.roles.some((role) => requiredRoles.includes(role));

    console.log("user role info:", user.roles, hasRole());
    return user && user.roles && hasRole();
  }
}
