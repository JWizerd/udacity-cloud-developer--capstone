import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketAttendeesController } from './market-attendees.controller';
import { MarketAttendeesService } from './market-attendees.service';
import { UserMock } from '../users/mocks/user-entity.mock';
import { MarketAttendeeDTO } from './mocks/market-attendee-dto.mock';
import { MarketAttendeeEntityMock } from './mocks/market-attendee.mock';

describe('MarketAttendeesController', () => {
  let controller: MarketAttendeesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketAttendeesController],
      providers: [
        {
          provide: MarketAttendeesService,
          useValue: ServiceMock,
        },
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MarketAttendeesController>(
      MarketAttendeesController,
    );

    service = module.get<MarketAttendeesService>(MarketAttendeesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('paginate', () => {
    it('should call service.paginate with correct params', async () => {
      const servicePaginateSpy = jest.spyOn(service, 'paginate');

      await controller.index(1, '2021-01-01');

      expect(servicePaginateSpy).toHaveBeenCalledWith(
        { page: 1, limit: 10 },
        { created: '2021-01-01', market: 1 },
        'DESC',
      );
    });

    it('should return value from paginate', async () => {
      jest.spyOn(service, 'paginate').mockResolvedValue(true);

      const result = await controller.index(1, '2021-01-01');

      expect(result).toBe(true);
    });
  });

  describe('create', () => {
    it('should call service.create with correct params', async () => {
      const serviceCreateSpy = jest.spyOn(service, 'create');

      await controller.create(1, MarketAttendeeDTO, UserMock);

      expect(serviceCreateSpy).toHaveBeenCalledWith(
        1,
        UserMock,
        MarketAttendeeDTO,
      );
    });

    it('should return newly created entity', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(MarketAttendeeEntityMock);

      const entity = await controller.create(1, MarketAttendeeDTO, UserMock);

      expect(entity).toEqual(MarketAttendeeEntityMock);
    });
  });

  describe('update', () => {
    it('should call service.update with correct params', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      await controller.update(1, MarketAttendeeDTO);

      expect(updateSpy).toHaveBeenCalledWith(1, MarketAttendeeDTO);
    });

    it('should call service.update with correct params', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(MarketAttendeeEntityMock);

      const entity = await controller.update(1, MarketAttendeeDTO);

      expect(entity).toEqual(MarketAttendeeEntityMock);
    });
  });

  describe('delete', () => {
    it('should call service.remove with correct params', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');

      await controller.remove(1);

      expect(deleteSpy).toHaveBeenCalledWith(1);
    });

    it('should return void', async () => {
      jest.spyOn(service, 'remove');

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
    });
  });
});
