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

import { MarketEventsService } from './market-events.service';
import { AuthGuard } from '../auth/auth.guard';
import { MarketEventsOwnershipGuard } from './market-events-ownership.guard';
import { CreateMarketDTO } from './dtos/create.dto';
import { UpdateMarketDTO } from './dtos/update.dto';

@Controller('marketplaces')
export class MarketEventsController {
  constructor(private readonly service: MarketEventsService) {}

  @Get(':id/events')
  async index(
    @Param('id', ParseIntPipe) id: number,
    @Query('created') created?: string,
    @Query('name') name?: string,
    @Query('zipcode') zipcode?: string,
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
  ) {
    const options = {
      created,
      name,
      marketplace: id,
      zipcode: zipcode ? parseInt(zipcode, 10) : zipcode,
      city,
      state,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':id/events/:eventId')
  async findOne(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.service.findOne(eventId);
  }

  @Post(':id/events')
  @UseGuards(AuthGuard)
  async create(
    @Param('id') marketplaceId: number,
    @Body() createMarketDTO: CreateMarketDTO,
  ) {
    return this.service.create(createMarketDTO, marketplaceId);
  }

  @Delete(':id/events/:eventId')
  @UseGuards(AuthGuard, MarketEventsOwnershipGuard)
  async remove(@Param('eventId', ParseIntPipe) eventId: number) {
    this.service.remove(eventId);
  }

  @Patch(':id/events/:eventId')
  @UseGuards(AuthGuard, MarketEventsOwnershipGuard)
  async update(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() updateMarketDTO: UpdateMarketDTO,
  ) {
    return this.service.update(eventId, updateMarketDTO);
  }
}
