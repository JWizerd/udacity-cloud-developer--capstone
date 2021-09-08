import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../utils/typeorm/base.entity';

@Entity()
export class Profile extends BaseEntity {
  constructor(profile?: Profile) {
    super();
    if (profile) {
      Object.assign(profile, this);
    }
  }

  @Column({ nullable: false, unique: true })
  userUuid?: string;

  @Column({ nullable: false })
  firstName?: string;

  @Column({ nullable: false })
  lastName?: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;
}
