import { CanActivate, ExecutionContext } from '@nestjs/common';
import { MarketplacesService } from 'src/marketplaces/marketplaces.service';

export class MarketsOwnershipGuard implements CanActivate {
  constructor(private readonly marketplacesService: MarketplacesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const marketplace = await this.marketplacesService.findOne(req.params.id);
      if (!marketplace) return false;
      return this.marketplacesService.ownsResource(
        marketplace.id,
        req.params.marketId,
        'marketplace',
      );
    } catch (error) {
      return false;
    }
  }
}
