import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { MarketEvent } from './market-event.entity';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { TenantedService } from '../typeorm/tenanted.service';

@Injectable()
export class MarketEventsService extends TenantedService<MarketEvent> {
  constructor(
    @InjectRepository(MarketEvent) protected readonly repo: Repository<MarketEvent>,
    private readonly marketplacesService: MarketplacesService,
  ) {
    super(repo);
  }

  async create(
    createMarketDTO: DeepPartial<MarketEvent>,
    marketplaceId: number,
  ): Promise<MarketEvent> {
    const marketplace = await this.marketplacesService.findOne(marketplaceId);
    const market = this.repo.create(createMarketDTO);
    market.marketplace = marketplace;
    return this.repo.save(market);
  }
}
