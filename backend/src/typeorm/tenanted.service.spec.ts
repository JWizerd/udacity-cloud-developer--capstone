import { TenantedService } from './tenanted.service';
import { MockEntity } from '../../test/mocks/entity.mock';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { UserMock } from '../users/mocks/user-entity.mock';
import { QueryBuilderMock } from '../../test/mocks/queryBuilder.mock';
describe('TenantedService', () => {
  const entity = MockEntity;
  let service: TenantedService<typeof entity>;
  let repo: typeof RepositoryMock;
  let whereSpy;
  let andWhereSpy;
  let getOneSpy;

  beforeEach(() => {
    repo = RepositoryMock as any;
    service = new TenantedService(repo as any);
    getOneSpy = jest.spyOn(QueryBuilderMock, 'getOne');
    andWhereSpy = jest.spyOn(QueryBuilderMock, 'andWhere').mockReturnThis();
    whereSpy = jest.spyOn(QueryBuilderMock, 'where').mockReturnThis();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('ownsResource', () => {
    it('should call repo.createQueryBuilder with correct params', async () => {
      const createQueryBuilder = jest
        .spyOn(repo, 'createQueryBuilder')
        .mockReturnValue(QueryBuilderMock);

      await service.ownsResource('abc123', 1, 'market');

      expect(createQueryBuilder).toHaveBeenCalledWith('r');
    });

    it('should call queryBuilder with correct params and default to user if no parentColum param provided', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);

      await service.ownsResource('abc123', 1);

      expect(whereSpy).toHaveBeenCalledWith('r.id = :resourceId', {
        resourceId: 1,
      });
    });

    it('should queryBuilder.andWhere withc correct params', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);

      await service.ownsResource('abc123', 1);

      expect(andWhereSpy).toHaveBeenCalledWith('r.userId = :ownerId', {
        ownerId: 'abc123',
      });
    });

    it('should queryBuilder.andWhere custom set joinColumn param', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);

      await service.ownsResource('abc123', 1, 'poo');

      expect(andWhereSpy).toHaveBeenCalledWith(`r.${'poo'} = :ownerId`, {
        ownerId: 'abc123',
      });
    });

    it('should return true if queryBuilder.getOne returns a record signifying the user/owner does own the resource', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);
      getOneSpy.mockResolvedValue({});

      const ownsResource = await service.ownsResource('abc123', 1);

      expect(ownsResource).toEqual(true);
    });

    it('should return false if queryBuilder.getOne returns undefined signifying the user/owner does NOT own the resource', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);
      getOneSpy.mockResolvedValue(undefined);

      const ownsResource = await service.ownsResource('abc123', 1);

      expect(ownsResource).toEqual(false);
    });
  });

  describe('findOneByUser', () => {
    it('should call repo.createQueryBuilder with correct params', async () => {
      const queryBuilerSpy = jest
        .spyOn(repo, 'createQueryBuilder')
        .mockReturnValue(QueryBuilderMock);

      await service.findOneByUser(1, UserMock);

      expect(queryBuilerSpy).toHaveBeenCalledWith('r');
    });

    it('should queryBuilder.where with correct params', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);
      getOneSpy.mockResolvedValue(undefined);

      await service.findOneByUser(1, UserMock);

      expect(whereSpy).toHaveBeenCalledWith('r.id = :id', { id: 1 });
    });

    it('should queryBuilder.where with correct params', async () => {
      jest.spyOn(repo, 'createQueryBuilder').mockReturnValue(QueryBuilderMock);
      getOneSpy.mockResolvedValue(undefined);

      await service.findOneByUser(1, UserMock);

      expect(andWhereSpy).toHaveBeenCalledWith('r.userId = :userId', {
        userId: UserMock.id,
      });
    });
  });
});
