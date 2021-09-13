import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/typeorm/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: Repository<User>,
  ) {
    super(repo);
  }
}
