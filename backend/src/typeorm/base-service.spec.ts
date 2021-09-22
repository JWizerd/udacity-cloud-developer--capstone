import { MockEntity } from '../../test/mocks/entity.mock';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { ResourceService } from './resource.service';
describe('ResourceService', () => {
  const entity = MockEntity;
  let service: ResourceService<typeof entity>;
  let repo: typeof RepositoryMock;
  const paginatorSpy = jest.fn();

  beforeEach(() => {
    repo = RepositoryMock as any;
    service = new ResourceService(repo as any, paginatorSpy as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('service.save', () => {
    it('should call with the correct params', async () => {
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(MockEntity);
      const createSpy = jest.spyOn(repo, 'create').mockReturnValue(MockEntity);
      await service.create(MockEntity);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(MockEntity);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(MockEntity);
    });

    it('should return an entity', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(MockEntity);
      const entity = await service.create(MockEntity);
      expect(entity).toEqual(MockEntity);
    });
  });

  describe('service.findOne', () => {
    it('should call with the correct params', async () => {
      const findOneSpy = jest
        .spyOn(repo, 'findOne')
        .mockResolvedValue(MockEntity);
      await service.findOne(1);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });

    it('should return an entity', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(MockEntity);
      const entity = await service.findOne(1);
      expect(entity).toEqual(MockEntity);
    });
  });

  describe('service.remove', () => {
    it('should call repo.findOne with the correct params', async () => {
      jest.spyOn(repo, 'remove');
      const findOneSpy = jest.spyOn(repo, 'findOne');

      await service.remove(1);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should call with the correct params', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(MockEntity);

      const removeSpy = jest.spyOn(repo, 'remove');

      await service.remove(1);

      expect(removeSpy).toHaveBeenCalledTimes(1);
      expect(removeSpy).toHaveBeenCalledWith(MockEntity);
    });

    it('should return the deleted entity', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValue(MockEntity);
      const entity = await service.remove(1);
      expect(entity).toBeUndefined();
    });
  });

  describe('service.update', () => {
    it('should call with the correct params', async () => {
      const MockEntity2 = { ...MockEntity, ...{ name: 'bob' } };
      const findOneSpy = jest
        .spyOn(repo, 'findOne')
        .mockResolvedValue(MockEntity);
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(MockEntity);
      await service.update(1, MockEntity2);
      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(MockEntity2);
    });

    it('should return updated entity', async () => {
      const MockEntity2 = { ...MockEntity, ...{ name: 'bob' } };
      jest.spyOn(repo, 'findOne').mockResolvedValue(MockEntity);
      jest.spyOn(repo, 'save').mockResolvedValue(MockEntity);
      const entity = await service.update(1, MockEntity2);
      expect(entity).toEqual(MockEntity);
    });
  });

  it('should call service.paginate with correct params', async () => {
    const order = 'ASC';

    const paginationOpts = {
      limit: 1,
      page: 1,
    };

    const searchOpts = {
      name: 'test market',
    } as any;

    await service.paginate(paginationOpts, searchOpts, order);

    expect(paginatorSpy).toHaveBeenCalledTimes(1);
    expect(paginatorSpy).toHaveBeenCalledWith(repo, paginationOpts, {
      where: searchOpts,
      order: {
        created: order,
      },
    });
  });
});
