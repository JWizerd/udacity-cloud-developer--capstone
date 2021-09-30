import { MarketplacesService } from "../services/marketplaces.service";
import { FilesServiceMock, axiosMock, fileMock, mockUrlsResponse } from "../mocks";
describe('MarketplacesService', () => {
  let service;
  const mockMarketWithFile = {
    featuredImage: fileMock,
    name: 'market name',
    summary: 'summary',
    description: 'description',
  };

  const mockMarketWithoutFile = {
    featuredImage: mockUrlsResponse.data.attachmentUrl,
    name: 'market name',
    summary: 'summary',
    description: 'description',
  };

  beforeEach(() => {
    service = new MarketplacesService(axiosMock, 'marketplaces', FilesServiceMock);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should call FilesService.upload with correct params', async () => {
      const mockMarket = { ...mockMarketWithFile };
      const featuredImage = mockMarket.featuredImage;
      const uploadfileSpy = jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
      jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: mockMarketWithoutFile });
      const altId = 1;
      await service.create(mockMarket, altId);
      expect(uploadfileSpy).toBeCalledWith(`marketplace-${altId}`, featuredImage);
    });

    it('should call axios.post with correct params', async () => {
      const mockMarket = { ...mockMarketWithFile };
      jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
      const axiosPostSpy = jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: mockMarketWithoutFile });
      await service.create(mockMarket);
      expect(axiosPostSpy).toBeCalledWith('marketplaces', mockMarketWithoutFile);
    });

    it('should return newly created market', async () => {
      const mockMarket = { ...mockMarketWithFile };
      jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
      jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: mockMarketWithoutFile });
      const market = await service.create(mockMarket);
      expect(market).toEqual(mockMarketWithoutFile);
    });
  });

  describe('update', () => {
    it('should throw error if market has no featuredImage', async () => {
      try {
        const mockMarket = { ...mockMarketWithFile };
        mockMarket.id = 1;
        delete mockMarket.featuredImage;

        await service.update(mockMarket);
      } catch (error) {
        expect(error.message).toEqual('Featured image is required.');
      }
    });

    it('should call FilesService.upload if featuredImage is a File', async () => {
        const mockMarket = { ...mockMarketWithFile };
        const featuredImage = mockMarket.featuredImage;
        mockMarket.id = 1;
        const uploadSpy = jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
        jest.spyOn(axiosMock, 'patch').mockResolvedValue({ data: mockMarketWithoutFile });
        const altImageId = 1;
        await service.update(mockMarket, 1);

        expect(uploadSpy).toHaveBeenCalledWith(`marketplace-${altImageId}`, featuredImage);
    });

    it('should not call FilesService.upload if featuredImage is not a File', async () => {
        const mockMarket = { ...mockMarketWithoutFile };
        mockMarket.id = 1;
        const uploadSpy = jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
        jest.spyOn(axiosMock, 'patch').mockResolvedValue({ data: mockMarketWithoutFile });
        await service.update(mockMarket, 1);

        expect(uploadSpy).not.toHaveBeenCalled();
    });

    it('should call axios.patch with correct params', async () => {
        const mockMarket = { ...mockMarketWithoutFile };
        mockMarket.id = 1;
        jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
        const patchSpy = jest.spyOn(axiosMock, 'patch').mockResolvedValue({ data: mockMarketWithoutFile });
        await service.update(mockMarket, 1);

        expect(patchSpy).toHaveBeenCalledWith(`marketplaces/${mockMarket.id}`, mockMarketWithoutFile);
    });

    it('should return updatedMarket', async () => {
      const mockMarket = { ...mockMarketWithoutFile };
      mockMarket.id = 1;
      jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
      jest.spyOn(axiosMock, 'patch').mockResolvedValue({ data: mockMarket });
      const updatedMarket = await service.update(mockMarket, 1);

      expect(updatedMarket).toEqual(mockMarket);
    });
  });

  describe('duplicate', () => {
    it('should call axios.post with correct params', async () => {
      const market = { ...mockMarketWithoutFile };
      const duplicatedMarket = { ...mockMarketWithoutFile };
      delete duplicatedMarket.id;
      duplicatedMarket.name = `COPY - ${market.name}`;

      const createSpy = jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: true });

      await service.duplicate(market);

      expect(createSpy).toHaveBeenCalledWith('marketplaces', duplicatedMarket);
    });

    it('should call axios.post with correct params', async () => {
      const market = { ...mockMarketWithoutFile };
      const duplicatedMarket = { ...mockMarketWithoutFile };
      delete duplicatedMarket.id;
      duplicatedMarket.name = `COPY - ${market.name}`;

      const createSpy = jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: true });

      await service.duplicate(market);

      expect(createSpy).toHaveBeenCalledWith('marketplaces', duplicatedMarket);
    });

    it('should return duplicated market', async () => {
      const market = { ...mockMarketWithoutFile };
      const duplicatedMarket = { ...mockMarketWithoutFile };
      delete duplicatedMarket.id;
      duplicatedMarket.name = `COPY - ${market.name}`;
      jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: duplicatedMarket });

      const newMarket = await service.duplicate(market);

      expect(newMarket).toEqual(duplicatedMarket);
    });
  });
});