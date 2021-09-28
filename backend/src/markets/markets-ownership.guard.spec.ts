import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketsOwnershipGuard } from './markets-ownership.guard';

describe('MarketsOwnershipGuard', () => {
  let guard: MarketsOwnershipGuard;
  beforeEach(() => {
    guard = new MarketsOwnershipGuard(ServiceMock as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
