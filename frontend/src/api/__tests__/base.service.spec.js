import { axiosMock } from "../mocks";
import Service from "../services/base.service";

describe('Service', () => {
  const mockResponseSingleEntity = {
    data: 'abc123',
  };
  const mockResponseEntityCollection = {
    data: ['abc123']
  }

  const mockRequest = {
    name: 'abc123',
  };

  let service;
  let resourceName = 'resource';
  beforeEach(() => {
    service = new Service(axiosMock, resourceName);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('find', () => {
    it('should call axios.get with correct params', async () => {
      const spy = jest.spyOn(axiosMock, 'get').mockResolvedValue(mockResponseEntityCollection);
      const params = { created: '2001-01-01' };
      await service.find(params);
      expect(spy).toHaveBeenCalledWith(resourceName, { params });
    });

    it('should return a collection of items', async () => {
      jest.spyOn(axiosMock, 'get').mockResolvedValue(mockResponseEntityCollection);
      const params = { created: '2001-01-01' };
      const result = await service.find(params);
      expect(result).toEqual(mockResponseEntityCollection.data);
    });
  });

  describe('findOne', () => {
    it('should call axios.get with correct params', async () => {
      const spy = jest.spyOn(axiosMock, 'get').mockResolvedValue(mockResponseSingleEntity);
      const id = 1;
      await service.findOne(1);
      expect(spy).toHaveBeenCalledWith(`${resourceName}/${id}`);
    });

    it('should return a single entity', async () => {
      jest.spyOn(axiosMock, 'get').mockResolvedValue(mockResponseSingleEntity);
      const id = 1;
      const result = await service.findOne(id);
      expect(result).toEqual(mockResponseSingleEntity.data);
    });
  });

  describe('create', () => {
    it('should call axios.post with correct params', async () => {
      const spy = jest.spyOn(axiosMock, 'post').mockResolvedValue(mockResponseSingleEntity);
      await service.create(mockRequest);
      expect(spy).toHaveBeenCalledWith(resourceName, mockRequest);
    });

    it('should return a single entity', async () => {
      jest.spyOn(axiosMock, 'post').mockResolvedValue(mockResponseSingleEntity);
      const result = await service.create(mockRequest);
      expect(result).toEqual(mockResponseSingleEntity.data);
    });
  });

  describe('update', () => {
    it('should call axios.patch with correct params', async () => {
      const spy = jest.spyOn(axiosMock, 'patch').mockResolvedValue(mockResponseSingleEntity);
      const id = 1;
      await service.update(id, mockRequest);
      expect(spy).toHaveBeenCalledWith(`${resourceName}/${id}`, mockRequest);
    });

    it('should return a single entity', async () => {
      jest.spyOn(axiosMock, 'patch').mockResolvedValue(mockResponseSingleEntity);
      const id = 1;
      const result = await service.update(id, mockRequest);
      expect(result).toEqual(mockResponseSingleEntity.data);
    });
  });

  describe('delete', () => {
    it('should call axios.delete with correct params', async () => {
      const spy = jest.spyOn(axiosMock, 'delete');
      const id = 1;
      await service.remove(id);
      expect(spy).toHaveBeenCalledWith(`${resourceName}/${id}`);
    });

    it('should return undefined', async () => {
      jest.spyOn(axiosMock, 'delete');
      const id = 1;
      const result = await service.remove(id);
      expect(result).toBeUndefined();
    });
  });

    describe('put', () => {
      it('should call axios.put with correct params', async () => {
        const spy = jest.spyOn(axiosMock, 'put').mockResolvedValue(mockResponseEntityCollection);
        const id = 1;
        await service.put(id, mockRequest);
        expect(spy).toHaveBeenCalledWith(`${resourceName}/${id}`, mockRequest);
      });

      it('should return entity', async () => {
        jest.spyOn(axiosMock, 'put').mockResolvedValue(mockResponseSingleEntity);
        const id = 1;
        const result = await service.put(id, mockRequest);
        expect(result).toEqual(mockResponseSingleEntity.data);
      });
  });

  describe('buildResource', () => {
    it('should return resource if no params in template', () => {
      const service = new Service(axiosMock, 'resource');

      const resourceUrl = service.buildResource();

      expect(resourceUrl).toEqual('resource');
    });

    it('should return properly formatted template based on params and resource template', () => {
      const service = new Service(axiosMock, 'resource/:grandparentId/parent/:parentId');

      const resourceUrl = service.buildResource({
        grandparentId: 1,
        parentId: 2,
      });

      expect(resourceUrl).toEqual('resource/1/parent/2');
    });

    it('should throw an error if the template contains a param that is not included in the request params', () => {
      const service = new Service(axiosMock, 'resource/:grandparentId/parent/:parentId');

      try {
        service.buildResource({
          grandparentId: 1,
        });
      } catch (error) {
        expect(error.message).toEqual('parentId parameter must be set')
      }
    });
      it('should throw an error if the template contains a param that is not included in the request params', () => {
        const service = new Service(axiosMock, 'resource/:grandparentId/parent/:parentId');

        try {
          service.buildResource({
            grandparentId: 1,
          });
        } catch (error) {
          expect(error.message).toEqual('parentId parameter must be set')
        }
    });
  });
});