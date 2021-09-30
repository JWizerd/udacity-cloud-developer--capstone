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
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@AuthUserParam() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete()
  async remove(@AuthUserParam() user: User) {
    return this.usersService.remove(user.id);
  }

  @Patch()
  async update(@AuthUserParam() user: User, updateUserDTO: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDTO);
  }
}
