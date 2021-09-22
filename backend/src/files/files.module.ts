import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [HttpModule],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
