import { Module } from '@nestjs/common';
import { MarketEventsModule } from '../market-events/market-events.module';
import { MarketAttendeesService } from './market-attendees.service';
import { MarketAttendeesController } from './market-attendees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketAttendee } from './market-attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketAttendee]), MarketEventsModule],
  providers: [MarketAttendeesService],
  controllers: [MarketAttendeesController],
})
export class MarketAttendeesModule {}
