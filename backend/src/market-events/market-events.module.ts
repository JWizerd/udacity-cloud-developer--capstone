import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketEvent } from './market-event.entity';
import { MarketEventsService } from './market-events.service';
import { MarketEventsController } from './market-events.controller';
import { MarketEventsOwnershipGuard } from './market-events-ownership.guard';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEvent]), MarketplacesModule],
  providers: [MarketEventsService, MarketEventsOwnershipGuard],
  controllers: [MarketEventsController],
  exports: [MarketEventsService],
})
export class MarketEventsModule {}
