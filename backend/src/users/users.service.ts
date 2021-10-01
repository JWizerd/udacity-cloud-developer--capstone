import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './user.entity';
import { ResourceService } from '../typeorm/resource.service';

@Injectable()
export class UsersService extends ResourceService<User> {
  constructor(
    @InjectRepository(User) protected readonly repo: Repository<User>,
  ) {
    super(repo);
  }

  async create(payload: DeepPartial<User>): Promise<User> {
    payload.username = `${payload.email.split('@')[0]}.${Date.now()}`;
    return super.create(payload);
  }

  async findOne(id: string): Promise<User> {
    return this.repo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
