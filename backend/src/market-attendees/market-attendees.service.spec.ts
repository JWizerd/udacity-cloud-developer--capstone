import { Test, TestingModule } from '@nestjs/testing';
import { MarketsService } from '../markets/markets.service';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketAttendeesService } from './market-attendees.service';
import { MarketEntityMock } from '../markets/mocks/market-entity.mock';
import { UserMock } from '../users/mocks/user-entity.mock';
import { MarketAttendeeEntityMock } from './mocks/market-attendee.mock';
import { MarketAttendeeDTO } from './mocks/market-attendee-dto.mock';

describe('MarketAttendeesService', () => {
  let service: MarketAttendeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketAttendeesService,
        {
          provide: 'MarketAttendeeRepository',
          useValue: RepositoryMock,
        },
        {
          provide: MarketsService,
          useValue: ServiceMock,
        },
      ],
    }).compile();

    service = module.get<MarketAttendeesService>(MarketAttendeesService);
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
        .spyOn(RepositoryMock, 'create')
        .mockReturnValue({});
      jest
        .spyOn(RepositoryMock, 'save')
        .mockResolvedValue(MarketAttendeeEntityMock);
      jest.spyOn(ServiceMock, 'findOne').mockResolvedValue(MarketEntityMock);

      await service.create(1, UserMock, MarketAttendeeDTO);

      expect(createSpy).toHaveBeenCalledWith(MarketAttendeeDTO);
    });

    it('should call marketService.findOne with correct params', async () => {
      jest.spyOn(RepositoryMock, 'create').mockReturnValue({});
      jest
        .spyOn(RepositoryMock, 'save')
        .mockResolvedValue(MarketAttendeeEntityMock);
      const findOneSpy = jest
        .spyOn(ServiceMock, 'findOne')
        .mockResolvedValue(MarketEntityMock);

      await service.create(1, UserMock, MarketAttendeeDTO);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should call repo.save with correct params', async () => {
      const attendeeMock = { ...MarketAttendeeDTO } as any;
      attendeeMock.user = UserMock;
      attendeeMock.market = MarketEntityMock;

      jest
        .spyOn(RepositoryMock, 'create')
        .mockReturnValue(MarketAttendeeEntityMock);
      const saveSpy = jest
        .spyOn(RepositoryMock, 'save')
        .mockResolvedValue(MarketAttendeeEntityMock);
      jest.spyOn(ServiceMock, 'findOne').mockResolvedValue(MarketEntityMock);

      await service.create(1, UserMock, MarketAttendeeDTO);

      expect(saveSpy).toHaveBeenCalledWith(attendeeMock);
    });

    it('should return newly created entity', async () => {
      jest
        .spyOn(RepositoryMock, 'create')
        .mockReturnValue(MarketAttendeeEntityMock);
      jest
        .spyOn(RepositoryMock, 'save')
        .mockResolvedValue(MarketAttendeeEntityMock);
      jest.spyOn(ServiceMock, 'findOne').mockResolvedValue(MarketEntityMock);

      const entity = await service.create(1, UserMock, MarketAttendeeDTO);

      expect(entity).toEqual(MarketAttendeeEntityMock);
    });
  });
});
