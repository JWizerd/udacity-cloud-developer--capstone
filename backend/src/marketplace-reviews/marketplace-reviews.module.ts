import { Module } from '@nestjs/common';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceReviewsController } from './marketplace-reviews.controller';

@Module({
  providers: [MarketplaceReviewsService],
  controllers: [MarketplaceReviewsController]
})
export class MarketplaceReviewsModule {}
