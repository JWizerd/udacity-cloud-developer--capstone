import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantedService } from '../typeorm/tenanted.service';
import { User } from '../users/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Marketplace } from './marketplace.entity';

@Injectable()
export class MarketplacesService extends TenantedService<Marketplace> {
  constructor(
    @InjectRepository(Marketplace)
    protected readonly repo: Repository<Marketplace>,
  ) {
    super(repo);
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
