import { Module } from '@nestjs/common';
import { MarketplaceReviewsService } from './marketplace-reviews.service';

@Module({
  providers: [MarketplaceReviewsService]
})
export class MarketplaceReviewsModule {}
