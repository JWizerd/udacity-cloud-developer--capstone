import { Module } from '@nestjs/common';
import { MarketEventsModule } from '../market-events/market-events.module';
import { MarketAttendeesService } from './market-attendees.service';
import { MarketAttendeesController } from './market-attendees.controller';

@Module({
  imports: [MarketEventsModule],
  providers: [MarketAttendeesService],
  controllers: [MarketAttendeesController],
})
export class MarketAttendeesModule {}
