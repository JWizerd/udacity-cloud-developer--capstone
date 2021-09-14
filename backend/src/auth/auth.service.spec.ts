import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as jwtManager from 'jsonwebtoken';
import { getPublicKey, JwksClientMock } from './mocks/jwksClient.mock';
import { publicSigningKeyMock } from './mocks/public-signing-key-mock';
import { noKidJwtMock } from './mocks/noKidJwt.mock';
import auth0ClientResultMock from './mocks/auth0-client-result.mock';
import auth0DecodedJwtMock from './mocks/jwtDecoded.mock';
import logStatements from './log-statements';

describe('AuthService', () => {
  let service: AuthService;
  let jwksClient: any;
  const mockJwtResult = {
    payload: {
      sub: 'mockUserId',
    },
  } as any;

  beforeEach(async () => {
    jwksClient = new JwksClientMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'JWT_MANAGER_CUSTOM',
          useValue: jwtManager,
        },
        {
          provide: 'JWKS_CLIENT',
          useValue: jwksClient,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should throw no header error if header not defined', () => {
      try {
        service.getToken(undefined);
      } catch (error) {
        expect(error.message).toBe(logStatements.getToken.error.noheader);
      }
    });

    it('should throw wrong auth header if header is not bearer auth', () => {
      try {
        service.getToken('abc123');
      } catch (error) {
        expect(error.message).toBe(logStatements.getToken.error.invalidHeader);
      }
    });

    it('should return token in bearer auth header', () => {
      const token = service.getToken('Bearer abc123');
      expect(token).toBe('abc123');
    });
  });

  describe('getSigngingKey', () => {
    it('should call jwtClient.getSigningKey with correct params', async () => {
      await service.getSigningKey(auth0DecodedJwtMock);
      expect(jwksClient.getSigningKey).toHaveBeenCalledWith(
        auth0DecodedJwtMock.header.kid,
      );
    });

    it('should call jwtClient.getSigningKey.getPublicKey with correct params', async () => {
      await service.getSigningKey(auth0DecodedJwtMock);
      expect(getPublicKey.getPublicKey).toHaveBeenCalled();
    });
  });

  describe('decodeToken', () => {
    it('should return decoded token', () => {
      const token = service.decodeToken(auth0ClientResultMock.idToken);
      expect(token).toEqual(auth0DecodedJwtMock);
    });

    it('should throw error if jwt has no kid in header', () => {
      try {
        service.decodeToken(noKidJwtMock);
      } catch (error) {
        expect(error.message).toBe(logStatements.decodeToken.error.noKid);
      }
    });
  });

  describe('verifyToken', () => {
    it('should call verifyToken with correct params', async () => {
      const mockBearerToken = `Bearer ${auth0ClientResultMock.idToken}`;
      jest
        .spyOn(service, 'getToken')
        .mockReturnValue(auth0ClientResultMock.idToken);
      jest.spyOn(service, 'decodeToken').mockReturnValue(auth0DecodedJwtMock);
      jest
        .spyOn(service, 'getSigningKey')
        .mockResolvedValue(publicSigningKeyMock);
      const verifySpy = jest
        .spyOn(jwtManager, 'verify')
        .mockImplementation(null);
      await service.verifyToken(mockBearerToken);
      expect(verifySpy).toHaveBeenCalledTimes(1);
      expect(verifySpy).toHaveBeenCalledWith(
        auth0ClientResultMock.idToken,
        publicSigningKeyMock,
      );
    });
  });

  describe('getUser', () => {
    it('should call getToken with correct params', () => {
      jest.spyOn(service, 'decodeToken').mockReturnValue(mockJwtResult);
      const getTokenSpy = jest.spyOn(service, 'getToken').mockImplementation();
      service.getUser('test');
      expect(getTokenSpy).toHaveBeenCalledTimes(1);
      expect(getTokenSpy).toHaveBeenCalledWith('test');
    });

    it('should call decodeToken with correct params', () => {
      const decodeToken = jest
        .spyOn(service, 'decodeToken')
        .mockReturnValue(mockJwtResult);
      jest.spyOn(service, 'getToken').mockReturnValue('123abc');
      service.getUser('Bearer 123abc');
      expect(decodeToken).toHaveBeenCalledTimes(1);
      expect(decodeToken).toHaveBeenCalledWith('123abc');
    });

    it('should return jwt.payload.sub', () => {
      jest.spyOn(service, 'decodeToken').mockReturnValue(mockJwtResult);
      jest.spyOn(service, 'getToken').mockReturnValue('123abc');
      const user = service.getUser('Bearer 123abc');
      expect(user).toBe(mockJwtResult.payload.sub);
    });
  });
});
