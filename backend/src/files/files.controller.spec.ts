import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FileServiceMock } from './mocks/file-service.mock';
import { uploadUrlsMock } from './mocks/s3-upload-urls.mock';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: FilesService,
          useValue: FileServiceMock,
        },
      ],
      controllers: [FilesController],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('controller.getUploadUrls', () => {
    it('should call service.uploadUrls with correct params', () => {
      const serviceGetUploadUrlsSpy = jest.spyOn(
        FileServiceMock,
        'getUploadUrls',
      );
      const key = 'abc123';

      controller.getUploadUrls(key);

      expect(serviceGetUploadUrlsSpy).toHaveBeenCalledWith(key);
    });

    it('should return uploadUrls', () => {
      jest
        .spyOn(FileServiceMock, 'getUploadUrls')
        .mockReturnValue(uploadUrlsMock);
      const key = 'abc123';

      const uploadUrls = controller.getUploadUrls(key);

      expect(uploadUrls).toEqual(uploadUrlsMock);
    });
  });
});
