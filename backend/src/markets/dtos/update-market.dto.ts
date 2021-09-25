import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { STATES } from '../constants';

export class UpdateMarketDTO {
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

  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  city?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(STATES)
  state?: string;
}
