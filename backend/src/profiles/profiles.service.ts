import { Injectable } from '@nestjs/common';
import { BaseService } from '../utils/typeorm/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProfile } from './profile.interface';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService extends BaseService<Profile> {
  constructor(
    @InjectRepository(Profile) protected readonly repo: Repository<IProfile>,
  ) {
    super(repo);
  }
}
