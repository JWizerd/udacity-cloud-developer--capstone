import { BaseEntity } from 'src/utils/typeorm/base.entity';

export interface IProfile extends BaseEntity {
  userUuid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  bio?: string;
}
