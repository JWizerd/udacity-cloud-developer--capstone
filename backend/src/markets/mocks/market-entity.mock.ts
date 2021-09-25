import { UserMock } from '../../users/mocks/user-entity.mock';
import { CreateMarketDTO } from '../dtos/create-market-dto.interface';
import { Market } from '../market.entity';

export const MarketEntityMock: Market = {
  name: 'market name',
  description: 'blah',
  id: 1,
  featuredImage: 'something.jpg',
  startDate: '2021-01-01',
  endDate: '2021-02-01',
  city: 'loveland',
  address: '1234 stiner',
  state: 'CO',
  zipcode: 80538,
  user: UserMock,
  attendees: [] as any,
};

export const MarketDTOMock: CreateMarketDTO = {
  name: 'market name',
  description: 'blah',
  summary: 'blah',
  featuredImage: 'something.jpg',
  startDate: '2021-01-01',
  endDate: '2021-02-01',
  city: 'loveland',
  address: '1234 stiner',
  state: 'CO',
  zipcode: 80538,
};
