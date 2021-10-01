import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { MarketAttendeesService } from './market-attendees.service';

@Injectable()
export class AlreadyRsvpGuard implements CanActivate {
  constructor(
    private readonly service: MarketAttendeesService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.header('Authorization');
      const userUuid = this.authService.getUser(authHeader);
      const review = await this.service.findByUserAndMarketEvent(
        userUuid,
        parseInt(req.params.eventId, 10),
      );

      return review === undefined;
    } catch (error) {
      return false;
    }
  }
}
