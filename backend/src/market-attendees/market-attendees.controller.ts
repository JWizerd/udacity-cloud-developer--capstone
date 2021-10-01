import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUserParam } from '../auth/auth-user-param.decorator';
import { User } from '../users/user.entity';
import { CreateMarketAttendeeDTO } from './dtos/create.dto';
import { MarketAttendeesOwnershipGuard } from './market-attendees-ownership.guard';
import { MarketAttendeesService } from './market-attendees.service';
import { UpdateMarketAttendeeDTO } from './dtos/update.dto';
import { AlreadyRsvpGuard } from './already-rsvp.guard';

@Controller('marketplaces')
export class MarketAttendeesController {
  constructor(private readonly service: MarketAttendeesService) {}

  @Get(':id/events/:eventId/attendees')
  async index(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Query('created') created: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
  ) {
    const options = {
      created,
      eventId,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':id/events/:eventId/attendees/:attendeeId')
  async findOne(
    @Param('attendeeId', ParseIntPipe) attendeeId: number,
    @AuthUserParam() user: User,
  ) {
    return this.service.findOneByUser(attendeeId, user);
  }

  @Post(':id/events/:eventId/attendees')
  @UseGuards(AuthGuard, AlreadyRsvpGuard)
  async create(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() marketAttendeeDTO: CreateMarketAttendeeDTO,
    @AuthUserParam() user: User,
  ) {
    return this.service.create(eventId, user, marketAttendeeDTO);
  }

  @Patch(':id/events/:eventId/attendees/:id')
  @UseGuards(AuthGuard, MarketAttendeesOwnershipGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() marketAttendeeDTO: UpdateMarketAttendeeDTO,
  ) {
    return this.service.update(id, marketAttendeeDTO);
  }

  @Delete(':id/events/:eventId/attendees/:id')
  @UseGuards(AuthGuard, MarketAttendeesOwnershipGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.service.remove(id);
  }
}
