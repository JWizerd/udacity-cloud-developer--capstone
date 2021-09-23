import { MarketService } from "../services/markets.service";
import { FilesServiceMock, axiosMock, fileMock, mockUrlsResponse } from "../mocks";
describe('MarketService', () => {
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
    service = new MarketService(axiosMock, 'markets', FilesServiceMock);
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
      expect(uploadfileSpy).toBeCalledWith(`market-${altId}`, featuredImage);
    });

    it('should call axios.post with correct params', async () => {
      const mockMarket = { ...mockMarketWithFile };
      jest.spyOn(FilesServiceMock, 'upload').mockResolvedValue(mockUrlsResponse.data.attachmentUrl);
      const axiosPostSpy = jest.spyOn(axiosMock, 'post').mockResolvedValue({ data: mockMarketWithoutFile });
      await service.create(mockMarket);
      expect(axiosPostSpy).toBeCalledWith('markets', mockMarketWithoutFile);
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

        expect(uploadSpy).toHaveBeenCalledWith(`market-${altImageId}`, featuredImage);
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

        expect(patchSpy).toHaveBeenCalledWith(`markets/${mockMarket.id}`, mockMarketWithoutFile);
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
});