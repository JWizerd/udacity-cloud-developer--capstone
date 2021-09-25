import { CanActivate, Injectable } from '@nestjs/common';
import { OwnershipGuard } from '../auth/ownership.guard';
import { AuthService } from '../auth/auth.service';
import { MarketAttendee } from './market-attendee.entity';
import { MarketAttendeesService } from './market-attendees.service';

@Injectable()
export class MarketAttendeesOwnershipGuard
  extends OwnershipGuard<MarketAttendee>
  implements CanActivate
{
  constructor(
    protected readonly authService: AuthService,
    protected readonly service: MarketAttendeesService,
  ) {
    super(service, authService);
  }
}
