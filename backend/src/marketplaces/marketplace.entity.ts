import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Market } from '../markets/market.entity';

@Entity()
export class Marketplace extends BaseEntity {
  constructor(market?: Marketplace) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @ManyToOne(() => User, (user) => user.marketplaces)
  user?: User;

  @OneToMany(() => Market, (market) => market.marketplace, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  markets?: Promise<Market[]>;

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

  @Column({ nullable: false, type: 'text' })
  policy?: string;

  @Column({ nullable: true })
  featuredImage?: string;
}
