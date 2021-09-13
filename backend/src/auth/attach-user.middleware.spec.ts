import { AttachUserMiddleware } from './attach-user.middleware';
import { AuthServiceMock } from './mocks/auth-service.mock';
import { ExpressRequestMock } from './mocks/express-req.mock';

describe('AttachUserMiddleware', () => {
  let authService;
  let middleware;
  beforeEach(() => {
    authService = new AuthServiceMock();
    middleware = new AttachUserMiddleware(authService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call express request.header with correct params', () => {
    const reqSpy = jest.spyOn(ExpressRequestMock, 'header');
    const nextSpy = jest.fn();
    middleware.use(ExpressRequestMock, null, nextSpy);
    expect(reqSpy).toHaveBeenCalledTimes(1);
    expect(reqSpy).toHaveBeenCalledWith('Authorization');
  });

  it('should call express authService.getUser with correct params', () => {
    jest.spyOn(ExpressRequestMock, 'header').mockReturnValue('test');
    const nextSpy = jest.fn();
    middleware.use(ExpressRequestMock, null, nextSpy);
    const authServiceGetUserSpy = jest.spyOn(authService, 'getUser');
    expect(authServiceGetUserSpy).toHaveBeenCalledTimes(1);
    expect(authServiceGetUserSpy).toHaveBeenCalledWith('test');
  });

  it('should attach result from authService.getUser to request object', () => {
    const expressMock = { ...ExpressRequestMock };
    jest.spyOn(expressMock, 'header').mockReturnValue('test');
    const nextSpy = jest.fn();
    jest.spyOn(authService, 'getUser').mockReturnValue('test');
    middleware.use(expressMock, null, nextSpy);
    expect(expressMock.user).toBe('test');
  });

  it('should call next', () => {
    const nextSpy = jest.fn();
    middleware.use(ExpressRequestMock, null, nextSpy);
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });
});
