import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../utils/typeorm/base.entity';

@Entity()
export class User extends BaseEntity {
  constructor(user?: User) {
    super();
    if (user) {
      Object.assign(user, this);
    }
  }

  @Column({ nullable: false, unique: true })
  userUuid?: string;

  @Column({ nullable: false, unique: true })
  username?: string;

  @Column({ nullable: false, unique: true })
  headshot?: string;

  @Column({ nullable: false })
  email?: string;
}
