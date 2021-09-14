import {
  Entity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
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

  @DeleteDateColumn()
  deleted?: Date;
}
