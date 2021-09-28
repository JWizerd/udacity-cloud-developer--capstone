import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEventsService } from '../market-events/market-events.service';
import { User } from '../users/user.entity';
import { DeepPartial } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { MarketAttendee } from './market-attendee.entity';
import { TenantedService } from '../typeorm/tenanted.service';

@Injectable()
export class MarketAttendeesService extends TenantedService<MarketAttendee> {
  constructor(
    @InjectRepository(MarketAttendee)
    protected readonly repo: Repository<MarketAttendee>,
    private readonly marketService: MarketEventsService,
  ) {
    super(repo);
  }

  async create(
    marketId: number,
    user: User,
    marketAttendeeDTO: DeepPartial<MarketAttendee>,
  ): Promise<MarketAttendee> {
    const market = await this.marketService.findOne(marketId);
    const entity = this.repo.create(marketAttendeeDTO);
    entity.user = user;
    entity.market = market;
    return this.repo.save(entity);
  }
}
