import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TenantedService } from 'src/typeorm/tenanted.service';
import { AuthService } from './auth.service';

export class OwnershipGuard<T> implements CanActivate {
  constructor(
    protected readonly service: TenantedService<T>,
    protected readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.header('Authorization');
      const user = this.authService.getUser(authHeader);
      return this.service.ownsResource(user, req.params.id);
    } catch (error) {
      return false;
    }
  }
}
