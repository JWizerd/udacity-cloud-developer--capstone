import { IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  bio?: string;
}
