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
import { AuthUserParam } from '../auth/auth-user-param.decorator';
import { CreateMarketDTO } from './dtos/create-market-dto.interface';
import { UpdateMarketDTO } from './dtos/update-market-dto.interface';
import { MarketsService } from './markets.service';
import { AuthGuard } from '../auth/auth.guard';
import { MarketsOwnershipGuard } from './markets-ownership.guard';

@Controller('markets')
export class MarketsController {
  constructor(private readonly service: MarketsService) {}

  @Get()
  async index(
    @Query('created') created: string,
    @Query('name') name: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
    @Query('filterByUser') filterByUser = false,
    @AuthUserParam() userId?: string,
  ) {
    const options = {
      created,
      name,
      user: filterByUser && userId ? userId : undefined,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @AuthUserParam() userId: string,
    @Body() createMarketDTO: CreateMarketDTO,
  ) {
    return this.service.create(createMarketDTO, userId);
  }

  @Delete()
  @UseGuards(MarketsOwnershipGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.service.remove(id);
  }

  @Patch()
  @UseGuards(MarketsOwnershipGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    updateMarketDTO: UpdateMarketDTO,
  ) {
    return this.service.update(id, updateMarketDTO);
  }
}
