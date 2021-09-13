import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AttachUserMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    const authHeader = req && req.header('Authorization');
    if (authHeader) {
      req.user = this.authService.getUser(authHeader);
    }
    next();
  }
}
