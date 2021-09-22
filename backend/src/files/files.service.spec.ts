import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigServiceMock } from '../../test/mocks/config-service.mock';
import { FilesService } from './files.service';
import { uploadUrlsMock } from './mocks/s3-upload-urls.mock';
import { s3Mock } from './mocks/s3.mock';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: 'default_S3ModuleConnectionToken',
          useValue: s3Mock,
        },
        {
          provide: ConfigService,
          useValue: ConfigServiceMock,
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('service.getUploadUrls', () => {
    it('it should call configService.get with correct params', () => {
      const configServiceGet = jest.spyOn(ConfigServiceMock, 'get');
      jest
        .spyOn(s3Mock, 'getSignedUrl')
        .mockReturnValue(uploadUrlsMock.uploadUrl);

      service.getUploadUrls('acb123');

      expect(configServiceGet).toHaveBeenCalledWith('AWS_S3_BUCKET');
    });

    it('it should call s3.getSignedUrl with correct params', () => {
      jest.spyOn(ConfigServiceMock, 'get').mockReturnValue('bucket-123');
      const s3GetSignedUrlSpy = jest
        .spyOn(s3Mock, 'getSignedUrl')
        .mockReturnValue(uploadUrlsMock.uploadUrl);

      service.getUploadUrls('acb123');

      expect(s3GetSignedUrlSpy).toHaveBeenCalledWith('putObject', {
        Key: 'acb123',
        Bucket: 'bucket-123',
      });
    });

    it('it should call s3.getSignedUrl with correct params', () => {
      jest.spyOn(ConfigServiceMock, 'get').mockReturnValue('bucket-123');
      jest
        .spyOn(s3Mock, 'getSignedUrl')
        .mockReturnValue(uploadUrlsMock.uploadUrl);

      const uploadUrls = service.getUploadUrls('acb123');

      expect(uploadUrls).toEqual(uploadUrlsMock);
    });
  });
});
