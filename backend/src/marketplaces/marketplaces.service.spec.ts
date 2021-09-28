import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { MarketplacesService } from './marketplaces.service';

describe('MarketplacesService', () => {
  let service: MarketplacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplacesService,
        {
          provide: 'MarketplaceRepository',
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    service = module.get<MarketplacesService>(MarketplacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
