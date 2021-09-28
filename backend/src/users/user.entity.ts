import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

import { Marketplace } from '../marketplaces/marketplace.entity';

@Entity()
export class User {
  constructor(user?: User) {
    if (user) {
      Object.assign(user, this);
    }
  }

  @PrimaryColumn()
  userUuid: string;

  @Column({ nullable: false, unique: true })
  username?: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  headshot?: string;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;

  @OneToMany(() => Marketplace, (marketplace) => marketplace.user, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  marketplaces?: Promise<Marketplace[]>;
}
