import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketplaceOwnershipGuard } from './marketplace-ownership.guard';

describe('MarketplaceOwnershipGuard', () => {
  it('should be defined', () => {
    expect(
      new MarketplaceOwnershipGuard(AuthServiceMock as any, ServiceMock as any),
    ).toBeDefined();
  });
});
