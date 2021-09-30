import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { MarketEventsService } from './market-events.service';

@Injectable()
export class MarketEventsOwnershipGuard implements CanActivate {
  constructor(
    private readonly marketplacesService: MarketplacesService,
    private readonly marketEventsService: MarketEventsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const marketplace = await this.marketplacesService.findOne(req.params.id);
      if (!marketplace) return false;
      const ownsResource = await this.marketEventsService.ownsResource(
        marketplace.id,
        req.params.eventId,
        'marketplaceId',
      );

      return ownsResource;
    } catch (error) {
      return false;
    }
  }
}
