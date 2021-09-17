import { Injectable } from '@nestjs/common';
import { BaseService } from '../typeorm/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async create(payload: DeepPartial<User>): Promise<User> {
    payload.username = `${payload.email.split('@')[0]}.${Date.now()}`;
    return super.create(payload);
  }
}
