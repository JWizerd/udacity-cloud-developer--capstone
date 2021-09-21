import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ITenantedService } from '../typeorm/resource-service.interface';
import { AuthService } from './auth.service';

export class OwnershipGuard<T> implements CanActivate {
  constructor(
    protected readonly service: ITenantedService<T>,
    protected readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.header('Authorization');
      await this.authService.verifyToken(authHeader);
      const user = this.authService.getUser(authHeader);
      return this.service.ownsResource(user, req.params.id);
    } catch (error) {
      return false;
    }
  }
}
