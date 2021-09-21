import { ServiceMock } from '../typeorm/mocks/service.mock';
import { MarketsOwnershipGuard } from './markets-ownership.guard';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';

describe('MarketsOwnershipGuard', () => {
  let guard: MarketsOwnershipGuard;
  beforeEach(() => {
    guard = new MarketsOwnershipGuard(
      ServiceMock as any,
      AuthServiceMock as any,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
