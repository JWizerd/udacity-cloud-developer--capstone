import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum Rating {
  ONE_STAR = 1,
  TWO_STARS = 2,
  THREE_STARS = 3,
  FOUR_STARS = 4,
  FIVE_STARS = 5,
}

export class CreateMarketplaceReviewDTO {
  @IsNotEmpty()
  @IsString()
  review: string;

  @IsNotEmpty()
  @IsNumber()
  @IsEnum(Rating)
  rating: number;
}
