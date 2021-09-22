import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { UploadUrls } from './upload-urls.interface';

@Injectable()
export class FilesService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private configService: ConfigService,
  ) {}
  getUploadUrls(key: string): UploadUrls {
    const uploadUrl = this.s3.getSignedUrl('putObject', {
      Key: key,
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
    });

    return {
      uploadUrl,
      attachmentUrl: uploadUrl.split('?')[0],
    };
  }
}
