import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthGuardMock } from '../auth/mocks/auth-guard.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { MarketDTOMock, MarketEntityMock } from './mocks/market-entity.mock';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { UserMock } from '../users/mocks/user-entity.mock';

describe('MarketsController', () => {
  let controller: MarketsController;
  let authGuard: AuthGuardMock;
  let authService;

  beforeEach(async () => {
    authGuard = new AuthGuardMock();
    authService = AuthServiceMock;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketsController],
      providers: [
        {
          provide: MarketsService,
          useValue: ServiceMock,
        },
        {
          provide: AuthGuard,
          useValue: authGuard,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<MarketsController>(MarketsController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('controller.findOne', () => {
    it('should call service.findOne with the correct params', async () => {
      const serviceFindOneSpy = jest.spyOn(ServiceMock, 'findOne');

      await controller.findOne(1);

      expect(serviceFindOneSpy).toHaveBeenCalledTimes(1);
      expect(serviceFindOneSpy).toHaveBeenCalledWith(1);
    });

    it('should return a market if found', async () => {
      jest.spyOn(ServiceMock, 'findOne').mockResolvedValue(MarketEntityMock);

      const market = await controller.findOne(1);

      expect(market).toEqual(MarketEntityMock);
    });
  });

  describe('controller.create', () => {
    it('should call service.create with correct params', async () => {
      const serviceCreateSpy = jest.spyOn(ServiceMock, 'create');

      await controller.create(UserMock, MarketDTOMock);

      expect(serviceCreateSpy).toHaveBeenCalledWith(MarketDTOMock, UserMock);
    });

    it('should return a newly created mock', async () => {
      jest.spyOn(ServiceMock, 'create').mockResolvedValue(MarketEntityMock);

      const market = await controller.create(UserMock, MarketDTOMock);

      expect(market).toEqual(MarketEntityMock);
    });
  });

  describe('controller.remove', () => {
    it('should call service.remove with correct params', async () => {
      const serviceRemoveSpy = jest
        .spyOn(ServiceMock, 'remove')
        .mockResolvedValue(MarketEntityMock);

      await controller.remove(1);

      expect(serviceRemoveSpy).toHaveBeenCalledWith(1);
    });

    it('should return undefined if successfully deleted', async () => {
      jest.spyOn(ServiceMock, 'remove').mockResolvedValue(MarketEntityMock);

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
    });
  });

  describe('controller.update', () => {
    it('should call service.update with correct params', async () => {
      const serviceUpdateSpy = jest
        .spyOn(ServiceMock, 'update')
        .mockResolvedValue(MarketEntityMock);

      await controller.update(1, MarketDTOMock);

      expect(serviceUpdateSpy).toHaveBeenCalledWith(1, MarketDTOMock);
    });

    it('should return updated entity', async () => {
      jest.spyOn(ServiceMock, 'update').mockResolvedValue(MarketEntityMock);

      const result = await controller.update(1, MarketEntityMock);

      expect(result).toEqual(MarketEntityMock);
    });
  });

  describe('controller.index', () => {
    it('should call service.paginate with correct params', async () => {
      const servicePaginateSpy = jest.spyOn(ServiceMock, 'paginate');

      const dateString = new Date().toDateString();

      await controller.index(dateString, 'test name', 10, 2, 'ASC');

      expect(servicePaginateSpy).toHaveBeenCalledWith(
        { page: 10, limit: 2 },
        { created: dateString, name: 'test name' },
        'ASC',
      );
    });

    it('should call service.paginate with default params', async () => {
      const servicePaginateSpy = jest.spyOn(ServiceMock, 'paginate');

      const dateString = new Date().toDateString();

      await controller.index(dateString, 'test name');

      expect(servicePaginateSpy).toHaveBeenCalledWith(
        { page: 1, limit: 10 },
        { created: dateString, name: 'test name' },
        'DESC',
      );
    });
  });
});
