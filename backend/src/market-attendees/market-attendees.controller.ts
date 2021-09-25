import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

@Controller('markets')
export class MarketAttendeesController {
  constructor(private readonly service: MarketAttendeesService) {}

  @Get(':marketId/market-attendees')
  async index(
    @Param('marketId', ParseIntPipe) market: number,
    @Query('created') created: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
  ) {
    const options = {
      created,
      market,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':marketId/market-attendees/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUserParam() user: User,
  ) {
    return this.service.findOneByUser(id, user);
  }

  @Post(':marketId/market-attendees')
  @UseGuards(AuthGuard)
  async create(
    @Param('marketId', ParseIntPipe) marketId: number,
    @Body() marketAttendeeDTO: CreateMarketAttendeeDTO,
    @AuthUserParam() user: User,
  ) {
    return this.service.create(marketId, user, marketAttendeeDTO);
  }

  @Post(':marketId/market-attendees/:id')
  @UseGuards(AuthGuard, MarketAttendeesOwnershipGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() marketAttendeeDTO: UpdateMarketAttendeeDTO,
  ) {
    return this.service.update(id, marketAttendeeDTO);
  }

  @Delete(':marketId/market-attendees/:id')
  @UseGuards(AuthGuard, MarketAttendeesOwnershipGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.service.remove(id);
  }
}
