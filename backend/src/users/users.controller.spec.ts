import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';
import { AuthGuardMock } from '../auth/mocks/auth-guard.mock';
import { UsersController } from './users.controller';
import { ServiceMock } from '../../test/mocks/service.mock';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserMock } from './mocks/user-entity.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let authService;
  let authGuard;
  let usersService;

  beforeEach(async () => {
    usersService = ServiceMock;
    authService = AuthServiceMock;
    authGuard = new AuthGuardMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: AuthGuard,
          useValue: authGuard,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('me', () => {
    it('should call service.findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(usersService, 'findOne');
      await controller.me('abc123');
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith('abc123');
    });

    it('should return an entity if found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(UserMock);
      const user = await controller.me('abc123');
      expect(user).toEqual(UserMock);
    });
  });

  describe('create', () => {
    it('should call create with correct params', async () => {
      const createSpy = jest.spyOn(usersService, 'create');
      await controller.create(UserMock);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(UserMock);
    });

    it('should return newly created user entity', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(UserMock);
      const newUser = await controller.create(UserMock);
      expect(newUser).toEqual(UserMock);
    });
  });

  describe('remove', () => {
    it('should call remove with correct params', async () => {
      const removeSpy = jest.spyOn(usersService, 'remove');
      await controller.remove('abc123');
      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith('abc123');
    });

    it('should return no response after successful deletion', async () => {
      jest.spyOn(usersService, 'remove').mockResolvedValue(undefined);
      const deletedUser = await controller.remove('acb123');
      expect(deletedUser).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should call update with correct params', async () => {
      const updateSpy = jest.spyOn(usersService, 'update');
      await controller.update('abc123', UserMock);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith('abc123', UserMock);
    });

    it('should return updated entity', async () => {
      jest.spyOn(usersService, 'update').mockResolvedValue(UserMock);
      const updatedUser = await controller.update('abc123', UserMock);
      expect(updatedUser).toEqual(UserMock);
    });
  });
});
