import { BaseEntity } from 'src/utils/typeorm/base.entity';

export interface IUser extends BaseEntity {
  userUuid: string;
  username: string;
  email: string;
  profilePic: string;
}
