import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { TenantedService } from '../typeorm/base-tenanted.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateMarketDTO } from './dtos/create-market-dto.interface';
import { UpdateMarketDTO } from './dtos/update-market-dto.interface';

import { Market } from './market.entity';

@Injectable()
export class MarketsService extends TenantedService<Market> {
  constructor(
    @InjectRepository(Market) protected readonly marketRepo: Repository<Market>,
    private readonly usersService: UsersService,
  ) {
    super(marketRepo);
  }

  async create(market: DeepPartial<Market>, userUuid: string): Promise<Market> {
    const marketEntity = this.marketRepo.create(market);
    const userEntity = await this.usersService.findOne(userUuid);
    marketEntity.user = userEntity;
    return this.marketRepo.save(marketEntity);
  }

  async findOne(marketId: number): Promise<Market> {
    return this.marketRepo.findOne(marketId);
  }

  async remove(userId: string, marketId: number) {
    const market = await this.marketRepo.findOne({
      where: {
        id: marketId,
        user: userId,
      },
    });

    if (market) {
      this.marketRepo.remove(market);
    }
  }

  async update(
    userId: string,
    marketId: number,
    updateMarketDTO: UpdateMarketDTO,
  ) {
    const market = await this.marketRepo.findOne({
      relations: ['user'],
    });

    if (market.user.userUuid === userId) {
      const updatedEntity = this.marketRepo.merge(market, updateMarketDTO);
      await this.marketRepo.update(marketId, updatedEntity);
      return updatedEntity;
    }
  }
}