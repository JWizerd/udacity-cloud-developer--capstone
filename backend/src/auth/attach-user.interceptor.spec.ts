import { AttachUserInterceptor } from './attach-user.interceptor';
import { AuthServiceMock } from './mocks/auth-service.mock';
import { ExpressRequestMock } from './mocks/express-req.mock';

describe('AttachUserInterceptor', () => {
  let interceptor: AttachUserInterceptor;
  let authService: any;
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
    authService = new AuthServiceMock();
    interceptor = new AttachUserInterceptor(authService);
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

  it('should call express request.header with correct params', () => {
    const reqSpy = jest.spyOn(ExpressRequestMock, 'header');
    interceptor.intercept(executionContext, callHandlerSpy);
    expect(reqSpy).toHaveBeenCalledTimes(1);
    expect(reqSpy).toHaveBeenCalledWith('Authorization');
  });

  it('should call express authService.getUser with correct params', () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('test');
    const authServiceGetUserSpy = jest.spyOn(authService, 'getUser');

    interceptor.intercept(executionContext, callHandlerSpy);
    expect(authServiceGetUserSpy).toHaveBeenCalledTimes(1);
    expect(authServiceGetUserSpy).toHaveBeenCalledWith('test');
  });

  it('should attach result from authService.getUser to request object', () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('foo');
    jest.spyOn(authService, 'getUser').mockReturnValue('bar');
    interceptor.intercept(executionContext, callHandlerSpy);
    expect(ExpressRequestMock.user).toBe('bar');
  });
});
