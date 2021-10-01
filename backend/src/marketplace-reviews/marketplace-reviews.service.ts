import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { User } from '../users/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { TenantedService } from '../typeorm/tenanted.service';
import { MarketplaceReview } from './marketplace-review.entity';
import { ISearchOptions } from '../typeorm/search-options.interface';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

interface MarketplaceReviewsSearchOptions extends ISearchOptions {
  marketplace: number;
  rating: number;
}

@Injectable()
export class MarketplaceReviewsService extends TenantedService<MarketplaceReview> {
  constructor(
    @InjectRepository(MarketplaceReview)
    protected readonly repo: Repository<MarketplaceReview>,
    private readonly marketplacesService: MarketplacesService,
  ) {
    super(repo);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions: MarketplaceReviewsSearchOptions,
    order: string,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('review');

    if (options.limit > 50) options.limit = 50;

    queryBuilder.where('review.marketplaceId = :marketplaceId', {
      marketplaceId: searchOptions.marketplace,
    });

    if (searchOptions.rating) {
      queryBuilder.andWhere('review.rating = :rating', {
        rating: searchOptions.rating,
      });
    }

    queryBuilder.orderBy('review.created', this.getOrderBy(order));

    return this.paginator<MarketplaceReview>(queryBuilder, options);
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
      .andWhere('review.marketplaceId = :marketplaceId', { marketplaceId })
      .getOne();
  }
}
