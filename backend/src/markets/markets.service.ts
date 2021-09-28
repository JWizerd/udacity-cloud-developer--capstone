import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Market } from './market.entity';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { TenantedService } from '../typeorm/tenanted.service';

@Injectable()
export class MarketsService extends TenantedService<Market> {
  constructor(
    @InjectRepository(Market) protected readonly repo: Repository<Market>,
    private readonly marketplacesService: MarketplacesService,
  ) {
    super(repo);
  }

  async create(
    createMarketDTO: DeepPartial<Market>,
    marketplaceId: number,
  ): Promise<Market> {
    const marketplace = await this.marketplacesService.findOne(marketplaceId);
    const market = this.repo.create(createMarketDTO);
    market.marketplace = marketplace;
    return this.repo.save(market);
  }
}
