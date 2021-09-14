import { BaseService } from './base.service';
import { MockEntity } from './mocks/entity.mock';
import { RepositoryMock } from './mocks/repository.mock';
describe('BaseService', () => {
  const entity = MockEntity;
  let service: BaseService<typeof entity>;
  let repo: RepositoryMock;
  const paginatorSpy = jest.fn();

  beforeEach(() => {
    repo = new RepositoryMock() as any;
    service = new BaseService(repo as any, paginatorSpy as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('service.save', () => {
    it('should call with the correct params', async () => {
      const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(MockEntity);
      await service.create(MockEntity);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(MockEntity);
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
    it('should call with the correct params', async () => {
      const deleteSpy = jest
        .spyOn(repo, 'delete')
        .mockResolvedValue(MockEntity);
      await service.remove(1);
      expect(deleteSpy).toHaveBeenCalledTimes(1);
      expect(deleteSpy).toHaveBeenCalledWith(1);
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
    const paginationOpts = {
      limit: 1,
      page: 1,
    };

    const searchOpts = {
      created: '2021-09-11T19:54:46.662Z',
    };

    const order = 'DESC';

    const addOrderBySpy = jest.fn();

    const createQueryBuilderSpy = jest
      .spyOn(repo, 'createQueryBuilder')
      .mockReturnValue({
        addOrderBy: addOrderBySpy,
      });

    await service.paginate(paginationOpts, searchOpts, order);

    expect(createQueryBuilderSpy).toHaveBeenCalledTimes(1);
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('e');

    expect(addOrderBySpy).toHaveBeenCalledTimes(1);
    expect(addOrderBySpy).toHaveBeenCalledWith(
      'e.created',
      order,
      'NULLS LAST',
    );

    expect(paginatorSpy).toHaveBeenCalledTimes(1);
    expect(paginatorSpy).toHaveBeenCalledWith(repo, paginationOpts, {
      where: searchOpts,
    });
  });
});
