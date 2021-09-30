import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

import { STATES } from '../constants';
export class CreateMarketDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
