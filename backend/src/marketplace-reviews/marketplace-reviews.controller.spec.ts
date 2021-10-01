import { Test, TestingModule } from '@nestjs/testing';
import { UserMock } from '../users/mocks/user-entity.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketplaceReviewsController } from './marketplace-reviews.controller';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceReviewDTOMock } from './mocks/marletplace-review-dto.mock';
import { MarketplaceReviewEntityMock } from './mocks/marketplace-review-entity.mock';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { AuthService } from '../auth/auth.service';
import { MarketplacesService } from '../marketplaces/marketplaces.service';

describe('MarketplaceReviewsController', () => {
  let controller: MarketplaceReviewsController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketplaceReviewsController],
      providers: [
        {
          provide: MarketplaceReviewsService,
          useValue: ServiceMock,
        },
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
        {
          provide: MarketplacesService,
          useValue: { ...ServiceMock },
        },
      ],
    }).compile();

    controller = module.get<MarketplaceReviewsController>(
      MarketplaceReviewsController,
    );
    service = module.get<MarketplaceReviewsService>(MarketplaceReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('should call service.paginate with correct params', async () => {
      const paginateSpy = jest.spyOn(service, 'paginate');

      await controller.index(1, '4', '2021-01-01', 1, 1, 'ASC');

      expect(paginateSpy).toHaveBeenCalledWith(
        { page: 1, limit: 1 },
        { created: '2021-01-01', rating: 4, marketplace: 1 },
        'ASC',
      );
    });

    it('should return entities', async () => {
      jest
        .spyOn(service, 'paginate')
        .mockResolvedValue([MarketplaceReviewEntityMock]);

      const result = await controller.index(1, '4', '2021-01-1', 1, 1, 'ASC');

      expect(result).toEqual([MarketplaceReviewEntityMock]);
    });
  });

  describe('create', () => {
    it('should call service.create with correct', async () => {
      const createSpy = jest.spyOn(service, 'create');

      await controller.create(UserMock, 1, MarketplaceReviewDTOMock);

      expect(createSpy).toHaveBeenCalledWith(
        UserMock,
        1,
        MarketplaceReviewDTOMock,
      );
    });

    it('should return newly created review', async () => {
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(MarketplaceReviewEntityMock);

      const review = await controller.create(
        UserMock,
        1,
        MarketplaceReviewDTOMock,
      );

      expect(review).toEqual(MarketplaceReviewEntityMock);
    });
  });

  describe('delete', () => {
    it('should call service.remove with correct params', async () => {
      const removeSpy = jest.spyOn(service, 'remove');

      await controller.delete(1);

      expect(removeSpy).toHaveBeenCalledWith(1);
    });

    it('should call service.remove with correct params', async () => {
      jest.spyOn(service, 'remove');

      const res = await controller.delete(1);

      expect(res).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should call service.update with correct params', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      await controller.update(1, MarketplaceReviewDTOMock);

      expect(updateSpy).toHaveBeenCalledWith(1, MarketplaceReviewDTOMock);
    });

    it('should return updated entity', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(MarketplaceReviewEntityMock);

      const review = await controller.update(1, MarketplaceReviewDTOMock);

      expect(review).toEqual(MarketplaceReviewEntityMock);
    });
  });
});
