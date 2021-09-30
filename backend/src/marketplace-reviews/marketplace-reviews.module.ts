import { Module } from '@nestjs/common';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceReviewsController } from './marketplace-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceReview } from './marketplace-review.entity';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';
import { MarketplaceReviewOwnershipGuard } from './marketplace-review-ownership.guard';
import { AlreadyReviewedGuard } from './already-reviewed.guard';

@Module({
  imports: [TypeOrmModule.forFeature([MarketplaceReview]), MarketplacesModule],
  providers: [
    MarketplaceReviewsService,
    MarketplaceReviewOwnershipGuard,
    AlreadyReviewedGuard,
    MarketplaceReviewsService,
  ],
  controllers: [MarketplaceReviewsController],
})
export class MarketplaceReviewsModule {}
