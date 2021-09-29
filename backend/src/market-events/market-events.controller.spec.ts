import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthGuardMock } from '../auth/mocks/auth-guard.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketEventsController } from './market-events.controller';
import { MarketEventsService } from './market-events.service';
import {
  MarketDTOMock,
  MarketEventEntityMock,
} from './mocks/market-event-entity.mock';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { MarketplaceEntityMock } from '../marketplaces/mocks/marketplace-entity.mock';

describe('MarketEventsController', () => {
  let controller: MarketEventsController;
  let authGuard: AuthGuardMock;
  let authService;

  beforeEach(async () => {
    authGuard = new AuthGuardMock();
    authService = AuthServiceMock;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketEventsController],
      providers: [
        {
          provide: MarketEventsService,
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

    controller = module.get<MarketEventsController>(MarketEventsController);
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
      jest
        .spyOn(ServiceMock, 'findOne')
        .mockResolvedValue(MarketEventEntityMock);

      const market = await controller.findOne(1);

      expect(market).toEqual(MarketEventEntityMock);
    });
  });

  describe('controller.create', () => {
    it('should call service.create with correct params', async () => {
      const serviceCreateSpy = jest.spyOn(ServiceMock, 'create');

      await controller.create(1, MarketDTOMock);

      expect(serviceCreateSpy).toHaveBeenCalledWith(MarketDTOMock, 1);
    });

    it('should return a newly created mock', async () => {
      jest
        .spyOn(ServiceMock, 'create')
        .mockResolvedValue(MarketEventEntityMock);

      const market = await controller.create(1, MarketDTOMock);

      expect(market).toEqual(MarketEventEntityMock);
    });
  });

  describe('controller.remove', () => {
    it('should call service.remove with correct params', async () => {
      const serviceRemoveSpy = jest
        .spyOn(ServiceMock, 'remove')
        .mockResolvedValue(MarketEventEntityMock);

      await controller.remove(1);

      expect(serviceRemoveSpy).toHaveBeenCalledWith(1);
    });

    it('should return undefined if successfully deleted', async () => {
      jest
        .spyOn(ServiceMock, 'remove')
        .mockResolvedValue(MarketEventEntityMock);

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
    });
  });

  describe('controller.update', () => {
    it('should call service.update with correct params', async () => {
      const serviceUpdateSpy = jest
        .spyOn(ServiceMock, 'update')
        .mockResolvedValue(MarketEventEntityMock);

      await controller.update(1, MarketDTOMock);

      expect(serviceUpdateSpy).toHaveBeenCalledWith(1, MarketDTOMock);
    });

    it('should return updated entity', async () => {
      jest
        .spyOn(ServiceMock, 'update')
        .mockResolvedValue(MarketEventEntityMock);

      const result = await controller.update(1, MarketEventEntityMock);

      expect(result).toEqual(MarketEventEntityMock);
    });
  });

  describe('controller.index', () => {
    it('should call service.paginate with correct params', async () => {
      const servicePaginateSpy = jest.spyOn(ServiceMock, 'paginate');

      const dateString = new Date().toDateString();

      await controller.index(
        MarketplaceEntityMock.id,
        dateString,
        'test name',
        80538,
        'loveland',
        'CO',
        10,
        2,
        'ASC',
      );

      expect(servicePaginateSpy).toHaveBeenCalledWith(
        { page: 10, limit: 2 },
        {
          marketplace: MarketplaceEntityMock.id,
          created: dateString,
          name: 'test name',
          zipcode: 80538,
          city: 'loveland',
          state: 'CO',
        },
        'ASC',
      );
    });

    it('should call service.paginate with default params', async () => {
      const servicePaginateSpy = jest.spyOn(ServiceMock, 'paginate');

      const dateString = new Date().toDateString();

      await controller.index(MarketplaceEntityMock.id, dateString, 'test name');

      expect(servicePaginateSpy).toHaveBeenCalledWith(
        { page: 1, limit: 10 },
        {
          marketplace: MarketplaceEntityMock.id,
          created: dateString,
          name: 'test name',
        },
        'DESC',
      );
    });
  });
});
