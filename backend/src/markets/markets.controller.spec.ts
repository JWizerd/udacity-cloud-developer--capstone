import { Test, TestingModule } from '@nestjs/testing';
import { ServiceMock } from '../typeorm/mocks/service.mock';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { MarketDTOMock, MarketEntityMock } from './mocks/market-entity.mock';

describe('MarketsController', () => {
  let controller: MarketsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketsController],
      providers: [
        {
          provide: MarketsService,
          useValue: ServiceMock,
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

      await controller.create('abc123', MarketDTOMock);

      expect(serviceCreateSpy).toHaveBeenCalledWith(MarketDTOMock, 'abc123');
    });

    it('should return a newly creted mock', async () => {
      jest.spyOn(ServiceMock, 'create').mockResolvedValue(MarketEntityMock);

      const market = await controller.create('abc123', MarketDTOMock);

      expect(market).toEqual(MarketEntityMock);
    });
  });
});
