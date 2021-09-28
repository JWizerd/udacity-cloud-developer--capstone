import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { STATES } from '../constants';
export class CreateMarketDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  summary: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  featuredImage?: string;

  @IsISO8601()
  startDate: string;

  @IsISO8601()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  city: string;

  @IsNotEmpty()
  @IsEnum(STATES)
  state: string;

  @IsNotEmpty()
  @IsNumber()
  zipcode: number;
}
