import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OwnershipGuard } from '../auth/ownership.guard';
import { Marketplace } from './marketplace.entity';
import { MarketplacesService } from './marketplaces.service';

@Injectable()
export class MarketplaceOwnershipGuard
  extends OwnershipGuard<Marketplace>
  implements CanActivate
{
  constructor(
    protected readonly authService: AuthService,
    protected readonly service: MarketplacesService,
  ) {
    super(service, authService);
  }
}
