import { Test, TestingModule } from '@nestjs/testing';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceEntityMock } from '../marketplaces/mocks/marketplace-entity.mock';
import { UserMock } from '../users/mocks/user-entity.mock';
import { MarketplaceReviewEntityMock } from './mocks/marketplace-review-entity.mock';
import { QueryBuilderMock } from '../../test/mocks/queryBuilder.mock';

describe('MarketplaceReviewsService', () => {
  let service: MarketplaceReviewsService;
  let marketplacesService: any;
  let repo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplaceReviewsService,
        {
          provide: MarketplacesService,
          useValue: ServiceMock,
        },
        {
          provide: 'MarketplaceReviewRepository',
          useValue: RepositoryMock,
        },
      ],
    }).compile();

    marketplacesService = module.get<MarketplacesService>(MarketplacesService);
    repo = module.get<'MarketplaceReviewRepository'>(
      'MarketplaceReviewRepository',
    );
    service = module.get<MarketplaceReviewsService>(MarketplaceReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call marketplacesService.findOne with correct params', async () => {
      jest.spyOn(repo, 'create').mockReturnValue(MarketplaceReviewEntityMock);
      const findOneSpy = jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);

      await service.create(UserMock, 1, MarketplaceReviewEntityMock);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should call marketplacesService.findOne with correct params', async () => {
      const createSpy = jest
        .spyOn(repo, 'create')
        .mockReturnValue(MarketplaceReviewEntityMock);
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);

      await service.create(UserMock, 1, MarketplaceReviewEntityMock);

      expect(createSpy).toHaveBeenCalledWith(MarketplaceReviewEntityMock);
    });

    it('should call marketplacesService.save with correct params', async () => {
      const reviewWithUserAndMarketPlace = {
        ...MarketplaceReviewEntityMock,
      } as any;
      reviewWithUserAndMarketPlace.user = UserMock;
      reviewWithUserAndMarketPlace.marketplace = MarketplaceEntityMock;

      jest.spyOn(repo, 'create').mockReturnValue(MarketplaceReviewEntityMock);
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      const saveSpy = jest.spyOn(repo, 'save');

      await service.create(UserMock, 1, MarketplaceReviewEntityMock);

      expect(saveSpy).toHaveBeenCalledWith(reviewWithUserAndMarketPlace);
    });

    it('should call marketplacesService.save with correct params', async () => {
      const reviewWithUserAndMarketPlace = {
        ...MarketplaceReviewEntityMock,
      } as any;
      reviewWithUserAndMarketPlace.user = UserMock;
      reviewWithUserAndMarketPlace.marketplace = MarketplaceEntityMock;

      jest.spyOn(repo, 'create').mockReturnValue(MarketplaceReviewEntityMock);
      jest
        .spyOn(marketplacesService, 'findOne')
        .mockResolvedValue(MarketplaceEntityMock);
      jest.spyOn(repo, 'save').mockResolvedValue(MarketplaceReviewEntityMock);

      const review = await service.create(
        UserMock,
        1,
        MarketplaceReviewEntityMock,
      );

      expect(review).toEqual(reviewWithUserAndMarketPlace);
    });
  });

  describe('findOneByUserAndMarketplace', () => {
    let whereSpy;
    let andWhereSpy;
    let getOneSpy;

    beforeEach(() => {
      getOneSpy = jest.spyOn(QueryBuilderMock, 'getOne');
      andWhereSpy = jest.spyOn(QueryBuilderMock, 'andWhere').mockReturnThis();
      whereSpy = jest.spyOn(QueryBuilderMock, 'where').mockReturnThis();
    });

    it('should call repo.createQuerybuilder with correct params', async () => {
      const queryBuilder = jest
        .spyOn(repo, 'createQueryBuilder')
        .mockReturnValue(QueryBuilderMock);

      await service.findByUserAndMarketplace('abc123', 1);

      expect(queryBuilder).toHaveBeenLastCalledWith('review');
    });

    it('should call Querybuilder.where with correct params', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);

      await service.findByUserAndMarketplace('abc123', 1);

      expect(whereSpy).toHaveBeenLastCalledWith('review.userId = :userId', {
        userId: 'abc123',
      });
    });

    it('should call Querybuilder.andWhere with correct params', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);

      await service.findByUserAndMarketplace('abc123', 1);

      expect(andWhereSpy).toHaveBeenLastCalledWith('review.marketplaceId', {
        marketplaceId: 1,
      });
    });

    it('should return review entity if found', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);
      getOneSpy.mockResolvedValue(MarketplaceReviewEntityMock);

      const review = await service.findByUserAndMarketplace('abc123', 1);

      expect(review).toEqual(MarketplaceReviewEntityMock);
    });
  });
});
