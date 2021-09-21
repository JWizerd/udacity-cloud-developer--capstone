import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Market extends BaseEntity {
  constructor(market?: Market) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @ManyToOne(() => User, (user) => user.markets)
  user?: User;

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false })
  summary?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

  @Column({ nullable: false })
  featuredImage?: string;
}
