import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';
import { MarketsController } from './markets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Market]), UsersModule],
  providers: [MarketsService],
  controllers: [MarketsController],
})
export class MarketsModule {}
