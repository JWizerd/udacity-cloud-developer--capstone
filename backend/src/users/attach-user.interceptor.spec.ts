import { UserMock } from '../users/mocks/user-entity.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { AttachUserInterceptor } from './attach-user.interceptor';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { ExpressRequestMock } from '../auth/mocks/express-req.mock';

describe('AttachUserInterceptor', () => {
  let interceptor: AttachUserInterceptor;
  let authService: any;
  let usersService: any;
  let callHandlerSpy: any;

  const executionContext: any = {
    switchToHttp() {
      return {
        getRequest() {
          return ExpressRequestMock;
        },
      };
    },
  };

  beforeEach(() => {
    authService = AuthServiceMock;
    usersService = ServiceMock;
    interceptor = new AttachUserInterceptor(authService, usersService);
    callHandlerSpy = {
      handle: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should call express request.header with correct params', async () => {
    const reqSpy = jest.spyOn(ExpressRequestMock, 'header');

    await interceptor.intercept(executionContext, callHandlerSpy);

    expect(reqSpy).toHaveBeenCalledTimes(1);
    expect(reqSpy).toHaveBeenCalledWith('Authorization');
  });

  it('should call express authService.getUser with correct params', async () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('test');
    jest.spyOn(usersService, 'findOne').mockResolvedValue(UserMock);
    const authServiceGetUserSpy = jest.spyOn(authService, 'getUser');

    await interceptor.intercept(executionContext, callHandlerSpy);

    expect(authServiceGetUserSpy).toHaveBeenCalledTimes(1);
    expect(authServiceGetUserSpy).toHaveBeenCalledWith('test');
  });

  it('should call usersService.findOne with correct params', async () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('test');
    jest.spyOn(authService, 'getUser').mockReturnValue('abc123');
    const findOneSpy = jest.spyOn(usersService, 'findOne');

    await interceptor.intercept(executionContext, callHandlerSpy);

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith('abc123', true);
  });

  it('should attach user to request object', async () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('foo');
    jest.spyOn(authService, 'getUser').mockReturnValue('bar');
    jest.spyOn(usersService, 'findOne').mockResolvedValue(UserMock);

    await interceptor.intercept(executionContext, callHandlerSpy);

    expect(ExpressRequestMock.user).toBe(UserMock);
  });
});
