import {
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
import { AlreadyReviewedGuard } from './already-reviewed.guard';
import { CreateMarketplaceReviewDTO } from './dtos/create.dto';
import { UpdateMarketplaceReviewDTO } from './dtos/update.dto';
import { MarketplaceReviewsService } from './marketplace-reviews.service';
import { MarketplaceOwnershipGuard } from '../marketplaces/marketplace-ownership.guard';

@Controller('marketplaces')
export class MarketplaceReviewsController {
  constructor(private readonly service: MarketplaceReviewsService) {}
  @Get()
  async index(
    @Query('created') created?: string,
    @Query('rating', ParseIntPipe) rating?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('order') order = 'DESC',
  ) {
    const options = {
      created,
      rating,
    };

    return this.service.paginate({ page, limit }, options, order);
  }

  @Post(':id/reviews')
  @UseGuards(AuthGuard, AlreadyReviewedGuard)
  async create(
    @AuthUserParam() user: User,
    @Param('id') marketplaceId: number,
    createMarketPlaceDTO: CreateMarketplaceReviewDTO,
  ) {
    return this.service.create(user, marketplaceId, createMarketPlaceDTO);
  }

  @Patch(':id/reviews/:reviewId')
  @UseGuards(AuthGuard, MarketplaceOwnershipGuard)
  async update(
    @Param('reviewId') reviewId: number,
    updateMarketPlaceDTO: UpdateMarketplaceReviewDTO,
  ) {
    return this.service.update(reviewId, updateMarketPlaceDTO);
  }

  @Delete(':id/reviews/:reviewId')
  @UseGuards(AuthGuard, MarketplaceOwnershipGuard)
  async delete(@Param('reviewId') reviewId: number) {
    this.service.remove(reviewId);
  }
}
