import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthServiceMock } from './mocks/auth-service.mock';
import { ExecutionContextMock } from './mocks/executionContextMock';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let authService: AuthServiceMock;
  const mockAuthHeader = 'Authorization test';

  beforeEach(async () => {
    authService = new AuthServiceMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    service = module.get<AuthGuard>(AuthGuard);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call AuthService.verifyToken with correct params', async () => {
    const verifyTokenSpy = jest.spyOn(authService, 'verifyToken');
    verifyTokenSpy.mockResolvedValueOnce(null);
    await service.canActivate(ExecutionContextMock(mockAuthHeader) as any);
    expect(authService.verifyToken).toHaveBeenCalledTimes(1);
    expect(authService.verifyToken).toHaveBeenCalledWith(mockAuthHeader);
  });

  it('should return false if verifyToken throws an error', async () => {
    const verifyTokenSpy = jest.spyOn(authService, 'verifyToken');
    verifyTokenSpy.mockRejectedValue(null);
    const result = await service.canActivate(
      ExecutionContextMock(mockAuthHeader) as any,
    );
    expect(result).toEqual(false);
  });

  it('should return true if verifyToken properly executes', async () => {
    const verifyTokenSpy = jest.spyOn(authService, 'verifyToken');
    verifyTokenSpy.mockResolvedValue(null);
    const result = await service.canActivate(
      ExecutionContextMock(mockAuthHeader) as any,
    );
    expect(result).toEqual(true);
  });
});
