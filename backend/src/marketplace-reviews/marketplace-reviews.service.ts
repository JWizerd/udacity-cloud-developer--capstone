import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { User } from '../users/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { TenantedService } from '../typeorm/tenanted.service';
import { MarketplaceReview } from './marketplace-review.entity';

@Injectable()
export class MarketplaceReviewsService extends TenantedService<MarketplaceReview> {
  constructor(
    @InjectRepository(MarketplaceReview)
    protected readonly repo: Repository<MarketplaceReview>,
    private readonly marketplacesService: MarketplacesService,
  ) {
    super(repo);
  }

  async create(
    user: User,
    marketplaceId: number,
    createMarketReviewDTO: DeepPartial<MarketplaceReview>,
  ) {
    const marketplace = await this.marketplacesService.findOne(marketplaceId);
    const review = this.repo.create(createMarketReviewDTO);
    review.user = user;
    review.marketplace = marketplace;
    return await this.repo.save(review);
  }

  async findByUserAndMarketplace(userId: string, marketplaceId: number) {
    const queryBuilder = this.repo.createQueryBuilder('review');

    return await queryBuilder
      .where('review.userId = :userId', { userId })
      .andWhere('review.marketplaceId', { marketplaceId })
      .getOne();
  }
}
