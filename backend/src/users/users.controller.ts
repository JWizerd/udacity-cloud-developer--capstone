import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUserParam } from '../auth/auth-user-param.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async me(@AuthUserParam() userId: string) {
    return this.usersService.findOne(userId);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete()
  async remove(@AuthUserParam() userId: string) {
    return this.usersService.remove(userId);
  }

  @Patch()
  async update(@AuthUserParam() userId: string, updateUserDTO: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDTO);
  }
}
