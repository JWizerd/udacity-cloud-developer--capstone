import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { MarketsOwnershipGuard } from './markets-ownership.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Market])],
  providers: [MarketsService, MarketsOwnershipGuard],
  controllers: [MarketsController],
  exports: [MarketsService],
})
export class MarketsModule {}
