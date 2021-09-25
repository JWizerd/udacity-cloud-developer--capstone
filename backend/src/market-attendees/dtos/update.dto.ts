import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateMarketAttendeeDTO {
  @IsNotEmpty()
  @MinLength(20)
  @IsOptional()
  rsvpDetails?: string;
}
