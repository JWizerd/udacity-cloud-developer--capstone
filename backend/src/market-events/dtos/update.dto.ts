import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { STATES } from '../constants';

export class UpdateMarketDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

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

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  zipcode?: number;
}
