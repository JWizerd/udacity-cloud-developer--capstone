import { axiosMock, mockUrlsResponse, fileMock } from "../mocks";
import { FilesService } from "../services/files.service";

describe('FilesService', () => {
  let service;

  const key = 'abc123';

  beforeEach(() => {
    service = new FilesService(axiosMock, 'files');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUploadUrls', () => {
    it('should call axios.get with correct params', async () => {
      const getSpy = jest.spyOn(axiosMock, 'get').mockResolvedValue(mockUrlsResponse);
      await service.getUploadUrls(key);
      expect(getSpy).toHaveBeenCalledWith(`files/upload-url/${key}`);
    });

    it('should return upload urls', async () => {
      jest.spyOn(axiosMock, 'get').mockResolvedValue(mockUrlsResponse);
      const urls = await service.getUploadUrls(key);
      expect(urls).toEqual(mockUrlsResponse.data);
    });
  });

  describe('upload', () => {
    it('should call service.getUploadUrls with correct params', async () => {
      const getUploadUrlsSpy = jest.spyOn(service, 'getUploadUrls').mockResolvedValue(mockUrlsResponse.data);
      jest.spyOn(axiosMock, 'put').mockResolvedValue(null);

      service.upload(key, fileMock);

      expect(getUploadUrlsSpy).toHaveBeenCalledWith(key)
    });

    it('should call axios.put with correct params', async () => {
      jest.spyOn(service, 'getUploadUrls').mockResolvedValue(mockUrlsResponse.data);
      const putSpy = jest.spyOn(axiosMock, 'put').mockResolvedValue(null);

      await service.upload(key, fileMock);

      expect(putSpy).toHaveBeenCalledWith(mockUrlsResponse.data.uploadUrl, fileMock);
    });

    it('should call return attachment url to newly uploaded file', async () => {
      jest.spyOn(service, 'getUploadUrls').mockResolvedValue(mockUrlsResponse.data);
      jest.spyOn(axiosMock, 'put').mockResolvedValue(null);

      const attachmentUrl = await service.upload(key, fileMock);

      expect(attachmentUrl).toEqual(mockUrlsResponse.data.attachmentUrl);
    });
  });
});