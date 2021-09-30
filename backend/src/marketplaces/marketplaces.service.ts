import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantedService } from '../typeorm/tenanted.service';
import { User } from '../users/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Marketplace } from './marketplace.entity';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ISearchOptions } from '../typeorm/search-options.interface';

interface MarketplaceSearchOptions extends ISearchOptions {
  name?: string;
}

@Injectable()
export class MarketplacesService extends TenantedService<Marketplace> {
  constructor(
    @InjectRepository(Marketplace)
    protected readonly repo: Repository<Marketplace>,
  ) {
    super(repo);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions: MarketplaceSearchOptions,
    order: string,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('marketplace');

    if (searchOptions.userId) {
      queryBuilder.where('marketplace.userId = :userId', {
        userId: searchOptions.userId,
      });
    }

    if (searchOptions.name) {
      queryBuilder.where('marketplace.userId = :userId', {
        userId: searchOptions.userId,
      });
    }

    queryBuilder.orderBy('marketplace.created', this.getOrderBy(order));

    if (options.limit > 50) options.limit = 50;

    return this.paginator<Marketplace>(queryBuilder, options);
  }

  async create(
    createMarketDTO: DeepPartial<Marketplace>,
    user: User,
  ): Promise<Marketplace> {
    const entity = this.repo.create(createMarketDTO);
    entity.user = user;
    return this.repo.save(entity);
  }
}
