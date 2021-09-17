import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMock } from '../typeorm/mocks/service.mock';
import { UsersService } from '../users/users.service';
import { RepositoryMock } from '../typeorm/mocks/repository.mock';
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
        {
          provide: UsersService,
          useValue: usersServiceMock,
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

  describe('findOne', () => {
    it('should call repo.findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');
      await service.findOne(1);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenLastCalledWith(1);
    });

    it('should return a market entity if found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(MarketEntityMock);
      const entity = await service.findOne(1);
      expect(entity).toEqual(MarketEntityMock);
    });
  });

  describe('create', () => {
    it('should call repo.create with correct params', async () => {
      const createSpy = jest
        .spyOn(repo, 'create')
        .mockReturnValue(MarketEntityMock);
      await service.create(MarketDTOMock, 'abc123');
      expect(createSpy).toHaveBeenCalledWith(MarketDTOMock);
    });

    it('should call usersService.findOne with correct params', async () => {
      jest.spyOn(repo, 'create').mockReturnValue(MarketEntityMock);
      const findOneSpy = jest.spyOn(usersServiceMock, 'findOne');
      await service.create(MarketDTOMock, 'abc123');
      expect(findOneSpy).toHaveBeenCalledWith('abc123');
    });

    it('should call repo.create with correct params', async () => {
      const marketEntityWithUser = { ...MarketDTOMock } as Market;
      marketEntityWithUser.user = UserMock as any;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest.spyOn(usersServiceMock, 'findOne').mockResolvedValue(UserMock);
      const saveSpy = jest.spyOn(repo, 'save');
      await service.create(MarketDTOMock, 'abc123');
      expect(saveSpy).toHaveBeenCalledWith(marketEntityWithUser);
    });

    it('should return a newly created market entity', async () => {
      const marketEntityWithUser = { ...MarketDTOMock } as any;
      marketEntityWithUser.user = UserMock;
      jest.spyOn(repo, 'create').mockReturnValue(MarketDTOMock);
      jest.spyOn(usersServiceMock, 'findOne').mockResolvedValue(UserMock);
      jest.spyOn(repo, 'save').mockResolvedValue(marketEntityWithUser);
      const newMarket = await service.create(MarketDTOMock, 'abc123');
      expect(newMarket).toEqual(marketEntityWithUser);
    });
  });

  describe('remove', () => {
    it('should call repo.findOne with correct params', async () => {
      const findOneSpy = jest
        .spyOn(repo, 'findOne')
        .mockResolvedValue(undefined);

      await service.remove('abc123', 1);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
          user: 'abc123',
        },
      });
    });
  });
});
