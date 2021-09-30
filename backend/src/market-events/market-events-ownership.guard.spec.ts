import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketEventsOwnershipGuard } from './market-events-ownership.guard';

describe('MarketEventsOwnershipGuard', () => {
  let guard: MarketEventsOwnershipGuard;
  beforeEach(() => {
    guard = new MarketEventsOwnershipGuard(
      ServiceMock as any,
      ServiceMock as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
