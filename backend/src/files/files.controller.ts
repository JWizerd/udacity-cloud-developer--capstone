import { Controller, Get, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadUrls } from './upload-urls.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly service: FilesService) {}
  @Get('upload-url/:key')
  getUploadUrls(@Param('key') key: string): UploadUrls {
    return this.service.getUploadUrls(key);
  }
}
