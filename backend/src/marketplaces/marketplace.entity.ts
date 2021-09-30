import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { MarketEvent } from '../market-events/market-event.entity';

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

  @OneToMany(() => MarketEvent, (market) => market.marketplace, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  events?: Promise<MarketEvent[]>;

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false, type: 'text' })
  summary?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  featuredImage?: string;
}
