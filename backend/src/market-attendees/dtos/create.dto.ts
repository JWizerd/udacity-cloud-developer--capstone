import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateMarketAttendeeDTO {
  @IsNotEmpty()
  @MinLength(20)
  rsvpDetails: string;
}
