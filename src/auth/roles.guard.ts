import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { USER_FORBIDDEN, USER_UNAUTHORIZED } from './auth.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      // const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      // if (bearer !== 'Bearer' || !token) {
      //   throw new HttpException(USER_UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
      // }

      const user = this.jwtService.verify(token);
      req.user = user;

      if (!requiredRoles.includes(user.role)) {
        throw new HttpException(USER_FORBIDDEN, HttpStatus.FORBIDDEN);
      }

      return true;
    } catch (e) {
      throw new HttpException(USER_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }
}
