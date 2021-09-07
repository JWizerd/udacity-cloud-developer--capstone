import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { jwtManagerCustomMock } from './mocks/jwtManager.mock';
import { AuthService } from './auth.service';
import { jwksClientMock } from './mocks/jwksClient.mock';

describe('AuthService', () => {
  let service: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
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

    service = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
