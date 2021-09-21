import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ITenantedService } from 'src/typeorm/resource-service.interface';
import { AuthService } from './auth.service';

@Injectable()
export class OwnershipGuard<T> implements CanActivate {
  constructor(
    protected readonly service: ITenantedService<T>,
    protected readonly authService: AuthService,
    protected readonly parentColumn: string = 'user',
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.header('Authorization');
    const user = this.authService.getUser(authHeader);
    return await this.service.ownsResource(
      user,
      req.params.id,
      this.parentColumn,
    );
  }
}
