import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class AttachUserInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.header('Authorization');

    if (authHeader) {
      const userId = this.authService.getUser(authHeader);
      const user = await this.usersService.findOne(userId, true);
      req.user = user;
    }

    return next.handle();
  }
}
