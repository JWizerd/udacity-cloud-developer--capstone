import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OwnershipGuard } from '../auth/ownership.guard';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';

@Injectable()
export class MarketsOwnershipGuard
  extends OwnershipGuard<Market>
  implements CanActivate
{
  constructor(
    protected readonly marketsService: MarketsService,
    protected readonly authService: AuthService,
  ) {
    super(marketsService, authService);
  }

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
