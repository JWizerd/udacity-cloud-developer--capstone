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

import { MarketsService } from './markets.service';
import { AuthGuard } from '../auth/auth.guard';
import { MarketsOwnershipGuard } from './markets-ownership.guard';
import { CreateMarketDTO } from './dtos/create.dto';
import { UpdateMarketDTO } from './dtos/update.dto';

@Controller('marketplaces')
export class MarketsController {
  constructor(private readonly service: MarketsService) {}

  @Get(':id/markets')
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

  @Get(':id/markets/:marketId')
  async findOne(@Param('marketId', ParseIntPipe) marketId: number) {
    return this.service.findOne(marketId);
  }

  @Post(':id/markets')
  @UseGuards(AuthGuard)
  async create(
    @Param('id') marketplaceId: number,
    @Body() createMarketDTO: CreateMarketDTO,
  ) {
    return this.service.create(createMarketDTO, marketplaceId);
  }

  @Delete(':id/markets/:marketId')
  @UseGuards(AuthGuard, MarketsOwnershipGuard)
  async remove(@Param('marketId', ParseIntPipe) marketId: number) {
    this.service.remove(marketId);
  }

  @Patch(':id/markets/:marketId')
  @UseGuards(AuthGuard, MarketsOwnershipGuard)
  async update(
    @Param('marketId', ParseIntPipe) marketId: number,
    @Body() updateMarketDTO: UpdateMarketDTO,
  ) {
    return this.service.update(marketId, updateMarketDTO);
  }
}
