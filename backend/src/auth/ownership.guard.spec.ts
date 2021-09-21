import { ServiceMock } from '../typeorm/mocks/service.mock';
import { AuthServiceMock } from './mocks/auth-service.mock';
import { OwnershipGuard } from './ownership.guard';
import { MockEntity } from '../typeorm/mocks/entity.mock';
import { ExecutionContextMock } from './mocks/executionContextMock';

describe('OwnershipGuard', () => {
  let guard: OwnershipGuard<typeof MockEntity>;
  const mockToken = 'abc123';
  const executionContextMock: any = ExecutionContextMock(mockToken);

  beforeEach(() => {
    guard = new OwnershipGuard(ServiceMock as any, AuthServiceMock as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should call authService.getUser with correct params', async () => {
    const authServiceSpy = jest.spyOn(AuthServiceMock, 'getUser');
    jest.spyOn(ServiceMock, 'ownsResource');

    await guard.canActivate(executionContextMock);

    expect(authServiceSpy).toHaveBeenCalledWith(mockToken);
  });

  it('should call service.ownsResource with correct params', async () => {
    jest.spyOn(AuthServiceMock, 'getUser').mockReturnValue('abc123');
    const ownsResourceSpy = jest.spyOn(ServiceMock, 'ownsResource');

    await guard.canActivate(executionContextMock);

    expect(ownsResourceSpy).toHaveBeenCalledWith('abc123', 1);
  });

  it('should call guard.canActive and return true if owns resource', async () => {
    jest.spyOn(AuthServiceMock, 'getUser');
    jest.spyOn(ServiceMock, 'ownsResource').mockResolvedValue(true);

    const ownsResource = await guard.canActivate(executionContextMock);

    expect(ownsResource).toEqual(true);
  });
});
