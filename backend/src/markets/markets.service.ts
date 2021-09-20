import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { TenantedService } from '../typeorm/base-tenanted.service';
import { DeepPartial, Repository } from 'typeorm';
import { Market } from './market.entity';

@Injectable()
export class MarketsService extends TenantedService<Market> {
  constructor(
    @InjectRepository(Market) protected readonly marketRepo: Repository<Market>,
    private readonly usersService: UsersService,
  ) {
    super(marketRepo);
  }

  async create(
    createMarketDTO: DeepPartial<Market>,
    userUuid: string,
  ): Promise<Market> {
    const marketEntity = this.marketRepo.create(createMarketDTO);
    const userEntity = await this.usersService.findOne(userUuid);
    marketEntity.user = userEntity;
    return this.marketRepo.save(marketEntity);
  }

  async findOne(marketId: number): Promise<Market> {
    return this.marketRepo.findOne(marketId);
  }

  async remove(marketId: number) {
    const market = await this.findOne(marketId);
    this.marketRepo.remove(market);
  }

  async update(marketId: number, updateMarketDTO: DeepPartial<Market>) {
    const market = this.marketRepo.create({
      id: marketId,
      ...updateMarketDTO,
    });

    return this.marketRepo.save(market);
  }
}
