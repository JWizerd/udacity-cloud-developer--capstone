import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceReviewsController } from './marketplace-reviews.controller';

describe('MarketplaceReviewsController', () => {
  let controller: MarketplaceReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketplaceReviewsController],
    }).compile();

    controller = module.get<MarketplaceReviewsController>(MarketplaceReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
