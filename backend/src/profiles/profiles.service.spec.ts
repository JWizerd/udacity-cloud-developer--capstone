import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { ProfileRepositoryMock } from './mocks/profile-repository.mock';

describe('ProfilesService', () => {
  let service: ProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: 'ProfileRepository',
          useValue: new ProfileRepositoryMock(),
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
