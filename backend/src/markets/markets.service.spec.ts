import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMock } from '../../test/mocks/service.mock';
import { UsersService } from '../users/users.service';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { MarketsService } from './markets.service';
import { MarketDTOMock, MarketEntityMock } from './mocks/market-entity.mock';
import { UserMock } from '../users/mocks/user-entity.mock';
import { Market } from './market.entity';

describe('MarketsService', () => {
  let service: MarketsService;
  const repo = RepositoryMock;
  const usersServiceMock = ServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketsService,
        {
          provide: 'MarketRepository',
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<MarketsService>(MarketsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repo.create with correct params', async () => {
      const createSpy = jest
        .spyOn(repo, 'create')
        .mockReturnValue(MarketEntityMock);
      await service.create(MarketDTOMock, UserMock);
      expect(createSpy).toHaveBeenCalledWith(MarketDTOMock);
    });

    it('should call repo.create with correct params', async () => {
      const marketEntityWithUser = { ...MarketDTOMock } as Market;
      marketEntityWithUser.user = UserMock as any;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest.spyOn(usersServiceMock, 'findOne').mockResolvedValue(UserMock);
      const saveSpy = jest.spyOn(repo, 'save');
      await service.create(MarketDTOMock, UserMock);
      expect(saveSpy).toHaveBeenCalledWith(marketEntityWithUser);
    });

    it('should return a newly created market entity', async () => {
      const marketEntityWithUser = { ...MarketDTOMock } as any;
      marketEntityWithUser.user = UserMock;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest.spyOn(usersServiceMock, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(repo, 'save').mockResolvedValue(marketEntityWithUser);
      const newMarket = await service.create(MarketDTOMock, UserMock);
      expect(newMarket).toEqual(marketEntityWithUser);
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
      jest.spyOn(repo, 'findOne').mockResolvedValue(MarketEntityMock);
      const removeSpy = jest.spyOn(repo, 'remove');

      await service.remove(1);

      expect(removeSpy).toHaveBeenCalledWith(MarketEntityMock);
    });
  });
});
