import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { TenantedService } from '../typeorm/tenanted.service';
import { DeepPartial, Repository } from 'typeorm';
import { Market } from './market.entity';
import { ITenantedService } from 'src/typeorm/resource-service.interface';
import { User } from '../users/user.entity';

@Injectable()
export class MarketsService
  extends TenantedService<Market>
  implements ITenantedService<Market>
{
  constructor(
    @InjectRepository(Market) protected readonly repo: Repository<Market>,
  ) {
    super(repo);
  }

  async create(
    createMarketDTO: DeepPartial<Market>,
    user: User,
  ): Promise<Market> {
    const entity = this.repo.create(createMarketDTO);
    entity.user = user;
    return this.repo.save(entity);
  }
}
