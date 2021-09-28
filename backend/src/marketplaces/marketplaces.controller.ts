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
import { CreateMarketplaceDTO } from './dtos/create.dto';
import { MarketplaceOwnershipGuard } from './marketplace-ownership.guard';
import { MarketplacesService } from './marketplaces.service';
import { UpdateMarketplaceDTO } from './dtos/update.dto';

@Controller('marketplaces')
export class MarketplacesController {
  constructor(private readonly service: MarketplacesService) {}

  @Get()
  async index(
    @AuthUserParam() user: User,
    @Query('created') created?: string,
    @Query('name') name?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
    @Query('filterByUser') filterByUser = false,
  ) {
    const options = {
      created,
      name,
      user: filterByUser ? user.userUuid : undefined,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, MarketplaceOwnershipGuard)
  async create(
    @AuthUserParam() user: User,
    @Body() createMarketplaceDTO: CreateMarketplaceDTO,
  ) {
    return this.service.create(createMarketplaceDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, MarketplaceOwnershipGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.service.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, MarketplaceOwnershipGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMarketplaceDTO: UpdateMarketplaceDTO,
  ) {
    return this.service.update(id, updateMarketplaceDTO);
  }
}
