import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarketEventsService } from '../market-events/market-events.service';
import { User } from '../users/user.entity';
import { DeepPartial } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { MarketAttendee } from './market-attendee.entity';
import { TenantedService } from '../typeorm/tenanted.service';
import { ISearchOptions } from 'src/typeorm/search-options.interface';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

interface MarketAttendeeISearchOptions extends ISearchOptions {
  eventId: number;
}

@Injectable()
export class MarketAttendeesService extends TenantedService<MarketAttendee> {
  constructor(
    @InjectRepository(MarketAttendee)
    protected readonly repo: Repository<MarketAttendee>,
    private readonly marketEventsService: MarketEventsService,
  ) {
    super(repo);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions: MarketAttendeeISearchOptions,
    order: string,
  ) {
    if (options.limit > 50) options.limit = 50;

    const queryBuilder = this.repo.createQueryBuilder('attendee');
    queryBuilder
      .leftJoinAndSelect('attendee.user', 'user')
      .where('attendee.eventId = :eventId', {
        eventId: searchOptions.eventId,
      })
      .orderBy('attendee.created', this.getOrderBy(order));

    return this.paginator<MarketAttendee>(queryBuilder, options);
  }

  async create(
    eventId: number,
    user: User,
    marketAttendeeDTO: DeepPartial<MarketAttendee>,
  ): Promise<MarketAttendee> {
    const event = await this.marketEventsService.findOne(eventId);
    const entity = this.repo.create(marketAttendeeDTO);
    entity.user = user;
    entity.event = event;
    return this.repo.save(entity);
  }

  async findByUserAndMarketEvent(userId: string, eventId: number) {
    const queryBuilder = this.repo.createQueryBuilder('attendee');

    return await queryBuilder
      .where('attendee.userId = :userId', { userId })
      .andWhere('attendee.eventId = :eventId', { eventId })
      .getOne();
  }
}
