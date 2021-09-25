import { TenantedService } from './tenanted.service';
import { MockEntity } from '../../test/mocks/entity.mock';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { UserMock } from '../users/mocks/user-entity.mock';
describe('TenantedService', () => {
  const entity = MockEntity;
  let service: TenantedService<typeof entity>;
  let repo: typeof RepositoryMock;

  beforeEach(() => {
    repo = RepositoryMock as any;
    service = new TenantedService(repo as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('ownsResource', () => {
    it('should call repo.findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');

      await service.ownsResource('abc123', 1, 'market');

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          market: 'abc123',
          id: 1,
        },
      });
    });

    it('should call repo.findOne with correct params and default to user if no parentColum param provided', async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');

      await service.ownsResource('abc123', 1);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          user: 'abc123',
          id: 1,
        },
      });
    });

    it('should return false if repo.findOne returns undefined signifying the user does not own the resource', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      const ownsResource = await service.ownsResource('abc123', 1);

      expect(ownsResource).toEqual(false);
    });

    it('should return true if repo.findOne returns undefined signifying the user does not own the resource', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue({});

      const ownsResource = await service.ownsResource('abc123', 1);

      expect(ownsResource).toEqual(true);
    });
  });

  describe('findOneByUser', () => {
    it('should call repo.findOne with correct params', async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');

      await service.findOneByUser(1, UserMock);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          id: 1,
          user: UserMock.userUuid,
        },
      });
    });

    it('should return an entity', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(MockEntity);

      const entity = await service.findOneByUser(1, UserMock);

      expect(entity).toEqual(entity);
    });
  });
});
