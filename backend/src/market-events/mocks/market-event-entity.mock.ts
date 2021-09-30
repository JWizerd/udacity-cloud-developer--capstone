import { MarketplaceEntityMock } from '../../marketplaces/mocks/marketplace-entity.mock';
import { CreateMarketDTO } from '../dtos/create-market-dto.interface';
import { MarketEvent } from '../market-event.entity';

export const MarketEventEntityMock: MarketEvent = {
  name: 'market name',
  description: 'blah',
  id: 1,
  startDate: '2021-01-01',
  endDate: '2021-02-01',
  city: 'loveland',
  address: '1234 stiner',
  state: 'CO',
  zipcode: 80538,
  marketplace: MarketplaceEntityMock,
  attendees: [] as any,
};

export const MarketDTOMock: CreateMarketDTO = {
  name: 'market name',
  description: 'blah',
  startDate: '2021-01-01',
  endDate: '2021-02-01',
  city: 'loveland',
  address: '1234 stiner',
  state: 'CO',
  zipcode: 80538,
};
