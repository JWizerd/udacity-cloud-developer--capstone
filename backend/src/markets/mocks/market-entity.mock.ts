import { CreateMarketDTO } from '../dtos/create-market-dto.interface';
import { Market } from '../market.entity';

export const MarketEntityMock: Market = {
  name: 'market name',
  description: 'blah',
  id: 1,
  featuredImage: 'something.jpg',
};

export const MarketDTOMock: CreateMarketDTO = {
  name: 'market name',
  description: 'blah',
  featuredImage: 'something.jpg',
};
