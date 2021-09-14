import { Market } from '../markets/market.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';

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
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, unique: true })
  headshot?: string;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;

  @OneToMany(() => Market, (market) => market.user, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  markets?: Promise<Market[]>;
}
