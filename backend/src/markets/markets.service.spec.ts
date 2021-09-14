import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMock } from '../utils/typeorm/mocks/service.mock';
import { UsersService } from '../users/users.service';
import { RepositoryMock } from '../utils/typeorm/mocks/repository.mock';
import { MarketsService } from './markets.service';

describe('MarketsService', () => {
  let service: MarketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketsService,
        {
          provide: 'MarketRepository',
          useValue: RepositoryMock,
        },
        {
          provide: UsersService,
          useValue: ServiceMock,
        },
      ],
    }).compile();

    service = module.get<MarketsService>(MarketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
