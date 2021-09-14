import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  email?: string;

  @IsOptional()
  headshot?: string;

  @IsOptional()
  username?: string;
}
