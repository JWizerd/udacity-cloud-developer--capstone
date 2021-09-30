import { Module } from '@nestjs/common';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceReviewsController } from './marketplace-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceReview } from './marketplace-review.entity';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';

@Module({
  imports: [TypeOrmModule.forFeature([MarketplaceReview]), MarketplacesModule],
  providers: [MarketplaceReviewsService],
  controllers: [MarketplaceReviewsController],
})
export class MarketplaceReviewsModule {}
