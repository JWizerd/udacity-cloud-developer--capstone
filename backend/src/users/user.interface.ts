import { BaseEntity } from '../utils/typeorm/base-entity.interface';

export interface IUser extends BaseEntity {
  userUuid: string;
  username: string;
  email: string;
  headshot?: string;
}