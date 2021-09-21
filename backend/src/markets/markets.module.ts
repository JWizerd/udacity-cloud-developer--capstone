import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';
import { MarketsOwnershipGuard } from './markets-ownership.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Market]), UsersModule],
  providers: [MarketsService, MarketsOwnershipGuard],
  controllers: [MarketsController],
})
export class MarketsModule {}
