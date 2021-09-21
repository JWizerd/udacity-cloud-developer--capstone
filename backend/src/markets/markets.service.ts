import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { TenantedService } from '../typeorm/tenanted.service';
import { DeepPartial, Repository } from 'typeorm';
import { Market } from './market.entity';
import { ITenantedService } from 'src/typeorm/resource-service.interface';

@Injectable()
export class MarketsService
  extends TenantedService<Market>
  implements ITenantedService<Market>
{
  constructor(
    @InjectRepository(Market) protected readonly repo: Repository<Market>,
    private readonly usersService: UsersService,
  ) {
    super(repo);
  }

  async create(
    createMarketDTO: DeepPartial<Market>,
    userId: string,
  ): Promise<Market> {
    const entity = this.repo.create(createMarketDTO);
    const userEntity = await this.usersService.findOne(userId);
    entity.user = userEntity;
    return this.repo.save(entity);
  }

  async findOne(marketId: number): Promise<Market> {
    return this.repo.findOne(marketId);
  }

  async remove(marketId: number) {
    const market = await this.findOne(marketId);
    this.repo.remove(market);
  }

  async update(marketId: number, updateMarketDTO: DeepPartial<Market>) {
    const market = this.repo.create({
      id: marketId,
      ...updateMarketDTO,
    });

    return this.repo.save(market);
  }
}
