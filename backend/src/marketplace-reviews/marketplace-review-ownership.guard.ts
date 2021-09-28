import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OwnershipGuard } from '../auth/ownership.guard';
import { MarketplaceReview } from './marketplace-review.entity';
import { MarketplaceReviewsService } from './marketplace-reviews.service';

@Injectable()
export class MarketplaceReviewOwnershipGuard
  extends OwnershipGuard<MarketplaceReview>
  implements CanActivate
{
  constructor(
    protected readonly authService: AuthService,
    protected readonly service: MarketplaceReviewsService,
  ) {
    super(service, authService);
  }
}
