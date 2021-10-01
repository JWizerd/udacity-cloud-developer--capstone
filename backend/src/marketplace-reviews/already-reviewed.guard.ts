import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { MarketplaceReviewsService } from './marketplace-reviews.service';

@Injectable()
export class AlreadyReviewedGuard implements CanActivate {
  constructor(
    private readonly service: MarketplaceReviewsService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.header('Authorization');
      const userUuid = this.authService.getUser(authHeader);
      const review = await this.service.findByUserAndMarketplace(
        userUuid,
        parseInt(req.params.id, 10),
      );

      return review === undefined;
    } catch (error) {
      return false;
    }
  }
}
