import { Module } from '@nestjs/common';
import { MarketplacesService } from './marketplaces.service';

@Module({
  providers: [MarketplacesService],
})
export class MarketplacesModule {}
