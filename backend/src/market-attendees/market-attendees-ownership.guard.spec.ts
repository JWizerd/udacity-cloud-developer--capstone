import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketAttendeesOwnershipGuard } from './market-attendees-ownership.guard';

describe('MarketAttendeesOwnershipGuard', () => {
  it('should be defined', () => {
    expect(
      new MarketAttendeesOwnershipGuard(
        ServiceMock as any,
        AuthServiceMock as any,
      ),
    ).toBeDefined();
  });
});
