import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { MarketAttendeesService } from './market-attendees.service';

@Injectable()
export class MarketAttendeesOwnershipGuard implements CanActivate {
  constructor(protected readonly service: MarketAttendeesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const event = await this.service.findOne(req.params.eventId);
      if (!event) return false;
      return this.service.ownsResource(event.id, req.params.id, 'eventId');
    } catch (error) {
      return false;
    }
  }
}
