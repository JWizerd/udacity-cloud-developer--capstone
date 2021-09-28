import { Module } from '@nestjs/common';
import { MarketplacesService } from './marketplaces.service';
import { MarketplacesController } from './marketplaces.controller';
import { Marketplace } from './marketplace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Marketplace])],
  providers: [MarketplacesService],
  controllers: [MarketplacesController],
  exports: [MarketplacesService],
})
export class MarketplacesModule {}
