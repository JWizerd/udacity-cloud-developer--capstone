import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtManagerCustomMock } from './mocks/jwtManager.mock';
import { jwksClientMock } from './mocks/jwksClient.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'JWT_MANAGER_CUSTOM',
          useValue: new jwtManagerCustomMock(),
        },
        {
          provide: 'JWKS_CLIENT',
          useValue: new jwksClientMock(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
