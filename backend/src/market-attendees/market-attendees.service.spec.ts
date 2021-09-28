import { Test, TestingModule } from '@nestjs/testing';
import { MarketEventsService } from '../market-events/market-events.service';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketAttendeesService } from './market-attendees.service';
import { MarketEventEntityMock } from '../market-events/mocks/market-event-entity.mock';
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
          provide: MarketEventsService,
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
      jest
        .spyOn(ServiceMock, 'findOne')
        .mockResolvedValue(MarketEventEntityMock);

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
        .mockResolvedValue(MarketEventEntityMock);

      await service.create(1, UserMock, MarketAttendeeDTO);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should call repo.save with correct params', async () => {
      const attendeeMock = { ...MarketAttendeeDTO } as any;
      attendeeMock.user = UserMock;
      attendeeMock.event = MarketEventEntityMock;

      jest
        .spyOn(RepositoryMock, 'create')
        .mockReturnValue(MarketAttendeeEntityMock);
      const saveSpy = jest
        .spyOn(RepositoryMock, 'save')
        .mockResolvedValue(MarketAttendeeEntityMock);
      jest
        .spyOn(ServiceMock, 'findOne')
        .mockResolvedValue(MarketEventEntityMock);

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
      jest
        .spyOn(ServiceMock, 'findOne')
        .mockResolvedValue(MarketEventEntityMock);

      const entity = await service.create(1, UserMock, MarketAttendeeDTO);

      expect(entity).toEqual(MarketAttendeeEntityMock);
    });
  });
});
