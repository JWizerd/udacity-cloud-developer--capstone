import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMock } from '../../test/mocks/service.mock';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { MarketEventsService } from './market-events.service';
import {
  MarketDTOMock,
  MarketEventEntityMock,
} from './mocks/market-event-entity.mock';
import { MarketEvent } from './market-event.entity';
import { MarketplaceEntityMock } from '../marketplaces/mocks/marketplace-entity.mock';
import { MarketplacesService } from '../marketplaces/marketplaces.service';

describe('MarketEventsService', () => {
  let service: MarketEventsService;
  const repo = RepositoryMock;
  const marketplacesService = ServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketEventsService,
        {
          provide: 'MarketEventRepository',
          useValue: repo,
        },
        {
          provide: MarketplacesService,
          useValue: marketplacesService,
        },
      ],
    }).compile();

    service = module.get<MarketEventsService>(MarketEventsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call marketplacesService.findOne with correct params', async () => {
      const findOneSpy = jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);

      await service.create(MarketDTOMock, MarketplaceEntityMock.id);

      expect(findOneSpy).toHaveBeenCalledWith(MarketplaceEntityMock.id);
    });

    it('should call repo.create with correct params', async () => {
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      const createSpy = jest
        .spyOn(repo, 'create')
        .mockReturnValue(MarketEventEntityMock);
      await service.create(MarketDTOMock, MarketplaceEntityMock.id);
      expect(createSpy).toHaveBeenCalledWith(MarketDTOMock);
    });

    it('should call repo.save with correct params', async () => {
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      const marketEntityWithMarketplace = { ...MarketDTOMock } as MarketEvent;
      marketEntityWithMarketplace.marketplace = MarketplaceEntityMock as any;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      const saveSpy = jest.spyOn(repo, 'save');
      await service.create(MarketDTOMock, MarketplaceEntityMock.id);
      expect(saveSpy).toHaveBeenCalledWith(marketEntityWithMarketplace);
    });

    it('should return a newly created market entity', async () => {
      const marketEntityWithMarketplace = { ...MarketDTOMock } as any;
      marketEntityWithMarketplace.user = MarketplaceEntityMock;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      jest.spyOn(repo, 'save').mockResolvedValue(marketEntityWithMarketplace);
      const newMarket = await service.create(MarketDTOMock, 1);
      expect(newMarket).toEqual(marketEntityWithMarketplace);
    });
  });

  describe('remove', () => {
    it('should call repo.findOne with correct params', async () => {
      const findOneSpy = jest
        .spyOn(repo, 'findOne')
        .mockResolvedValue(undefined);

      await service.remove(1);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should call remove with correct params', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(MarketEventEntityMock);
      const removeSpy = jest.spyOn(repo, 'remove');

      await service.remove(1);

      expect(removeSpy).toHaveBeenCalledWith(MarketEventEntityMock);
    });
  });
});
