import { Module } from '@nestjs/common';
import { MarketsModule } from '../markets/markets.module';
import { MarketAttendeesService } from './market-attendees.service';
import { MarketAttendeesController } from './market-attendees.controller';

@Module({
  imports: [MarketsModule],
  providers: [MarketAttendeesService],
  controllers: [MarketAttendeesController],
})
export class MarketAttendeesModule {}
