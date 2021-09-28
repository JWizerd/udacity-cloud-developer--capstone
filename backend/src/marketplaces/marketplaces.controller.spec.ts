import { Test, TestingModule } from '@nestjs/testing';
import { UserMock } from '../users/mocks/user-entity.mock';
import { ServiceMock } from '../../test/mocks/service.mock';
import { MarketplacesController } from './marketplaces.controller';
import { MarketplacesService } from './marketplaces.service';
import { MarketplaceEntityMock } from './mocks/marketplace-entity.mock';
import { AuthService } from '../auth/auth.service';
import { AuthServiceMock } from '../auth/mocks/auth-service.mock';

describe('MarketplacesController', () => {
  let controller: MarketplacesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketplacesController],
      providers: [
        {
          provide: MarketplacesService,
          useValue: ServiceMock,
        },
        {
          provide: AuthService,
          useValue: AuthServiceMock,
        },
      ],
    }).compile();

    controller = module.get<MarketplacesController>(MarketplacesController);
    service = module.get<MarketplacesService>(MarketplacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should call service.findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');

      await controller.findOne(1);

      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should call return marketplace', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(MarketplaceEntityMock);

      const marketplace = await controller.findOne(1);

      expect(marketplace).toEqual(MarketplaceEntityMock);
    });
  });

  describe('create', () => {
    it('should call service.create with correct params', async () => {
      const createSpy = jest.spyOn(service, 'create');

      await controller.create(UserMock, MarketplaceEntityMock);

      expect(createSpy).toHaveBeenCalledWith(MarketplaceEntityMock, UserMock);
    });

    it('should return newly created marketplace entity', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(MarketplaceEntityMock);

      const marketplace = await controller.create(
        UserMock,
        MarketplaceEntityMock,
      );

      expect(marketplace).toEqual(MarketplaceEntityMock);
    });
  });

  describe('delete', () => {
    it('should call service.remove with correct params', async () => {
      const removeSpy = jest.spyOn(service, 'remove');

      await controller.delete(1);

      expect(removeSpy).toHaveBeenCalledWith(1);
    });

    it('should return void', async () => {
      jest.spyOn(service, 'remove');

      const res = await controller.delete(1);

      expect(res).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should call service.update with correct params', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      await controller.update(1, MarketplaceEntityMock);

      expect(updateSpy).toHaveBeenCalledWith(1, MarketplaceEntityMock);
    });

    it('should return updated marketplace', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(MarketplaceEntityMock);

      const marketplace = await controller.update(1, MarketplaceEntityMock);

      expect(marketplace).toEqual(MarketplaceEntityMock);
    });
  });
});
