import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

enum Rating {
  ONE_STAR = 1,
  TWO_STARS = 2,
  THREE_STARS = 3,
  FOUR_STARS = 4,
  FIVE_STARS = 5,
}

export class UpdateMarketplaceReviewDTO {
  @IsOptional()
  @IsString()
  review: string;

  @IsOptional()
  @IsNumber()
  @IsEnum(Rating)
  rating: number;
}
