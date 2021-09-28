import { AuthServiceMock } from '../auth/mocks/auth-service.mock';

import { AlreadyReviewedGuard } from './already-reviewed.guard';
import { ExecutionContextMock } from './mocks/execution-context.mock';
import { ReviewServiceMock } from './mocks/service.mock';

describe('AlreadyReviewedGuard', () => {
  let guard;
  const marketplaceId = 1;
  const service = ReviewServiceMock;
  const mockUserToken = 'abc123';
  const executionContextMock: any = ExecutionContextMock(
    mockUserToken,
    marketplaceId,
  );

  beforeEach(() => {
    guard = new AlreadyReviewedGuard(service as any, AuthServiceMock as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call authService.getUser with correct params', async () => {
    const authServiceSpy = jest.spyOn(AuthServiceMock, 'getUser');

    await guard.canActivate(executionContextMock);

    expect(authServiceSpy).toHaveBeenCalledWith(mockUserToken);
  });

  it('should call service.findOneByUserAndMarketplace with correct params', async () => {
    jest.spyOn(AuthServiceMock, 'getUser').mockReturnValue(mockUserToken);
    const findOneSpy = jest.spyOn(service, 'findByUserAndMarketplace');

    await guard.canActivate(executionContextMock);

    expect(findOneSpy).toHaveBeenCalledWith(mockUserToken, marketplaceId);
  });

  it('should return true if user has not review yet', async () => {
    jest.spyOn(AuthServiceMock, 'getUser').mockReturnValue(mockUserToken);
    jest
      .spyOn(service, 'findByUserAndMarketplace')
      .mockResolvedValue(undefined);

    const res = await guard.canActivate(executionContextMock);

    expect(res).toEqual(true);
  });

  it('should return false if user has already reviewed', async () => {
    jest.spyOn(AuthServiceMock, 'getUser').mockReturnValue(mockUserToken);
    jest.spyOn(service, 'findByUserAndMarketplace').mockResolvedValue({});

    const res = await guard.canActivate(executionContextMock);

    expect(res).toEqual(false);
  });
});
