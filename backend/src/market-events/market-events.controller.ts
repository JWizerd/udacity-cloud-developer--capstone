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

  @Get(':id/market-events')
  async index(
    @Param('id', ParseIntPipe) id: number,
    @Query('created') created?: string,
    @Query('name') name?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
  ) {
    const options = {
      created,
      name,
      marketplace: id,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':id/market-events/:marketId')
  async findOne(@Param('marketId', ParseIntPipe) marketId: number) {
    return this.service.findOne(marketId);
  }

  @Post(':id/market-events')
  @UseGuards(AuthGuard)
  async create(
    @Param('id') marketplaceId: number,
    @Body() createMarketDTO: CreateMarketDTO,
  ) {
    return this.service.create(createMarketDTO, marketplaceId);
  }

  @Delete(':id/market-events/:marketId')
  @UseGuards(AuthGuard, MarketEventsOwnershipGuard)
  async remove(@Param('marketId', ParseIntPipe) marketId: number) {
    this.service.remove(marketId);
  }

  @Patch(':id/market-events/:marketId')
  @UseGuards(AuthGuard, MarketEventsOwnershipGuard)
  async update(
    @Param('marketId', ParseIntPipe) marketId: number,
    @Body() updateMarketDTO: UpdateMarketDTO,
  ) {
    return this.service.update(marketId, updateMarketDTO);
  }
}
