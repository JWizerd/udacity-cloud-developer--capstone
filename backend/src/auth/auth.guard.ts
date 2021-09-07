import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const authHeader = request.header('Authorization');

      if (authHeader && authHeader.includes('Bearer')) {
        return false;
      }

      this.authService.verifyToken(authHeader.split(' ')[1]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
