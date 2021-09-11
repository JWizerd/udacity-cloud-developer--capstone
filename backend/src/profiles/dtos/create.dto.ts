import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  userUuid: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  bio?: string;
}
