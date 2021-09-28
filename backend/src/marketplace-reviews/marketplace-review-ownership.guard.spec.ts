import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketplaceReviewOwnershipGuard } from './marketplace-review-ownership.guard';

describe('MarketplaceReviewOwnershipGuard', () => {
  it('should be defined', () => {
    expect(
      new MarketplaceReviewOwnershipGuard(
        AuthServiceMock as any,
        ServiceMock as any,
      ),
    ).toBeDefined();
  });
});
