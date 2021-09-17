import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Market]), UsersModule],
  providers: [MarketsService],
})
export class MarketsModule {}
