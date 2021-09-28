import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateMarketplaceDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  summary?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  featuredImage?: string;
}
