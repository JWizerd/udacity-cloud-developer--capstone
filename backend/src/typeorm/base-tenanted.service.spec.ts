import { TenantedService } from './base-tenanted.service';
import { MockEntity } from './mocks/entity.mock';
import { RepositoryMock } from './mocks/repository.mock';
describe('TenantedService', () => {
  const entity = MockEntity;
  let service: TenantedService<typeof entity>;
  let repo: typeof RepositoryMock;
  const paginatorSpy = jest.fn();

  beforeEach(() => {
    repo = RepositoryMock as any;
    service = new TenantedService(repo as any, paginatorSpy as any);
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
});
