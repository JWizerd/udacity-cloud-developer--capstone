import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { MarketEvent } from '../market-events/market-event.entity';
import { MarketplaceReview } from '../marketplace-reviews/marketplace-review.entity';

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
    onDelete: 'CASCADE',
  })
  events?: Promise<MarketEvent[]>;

  @OneToMany(() => MarketplaceReview, (review) => review.marketplace, {
    onDelete: 'CASCADE',
  })
  reviews?: Promise<MarketplaceReview[]>;

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false, type: 'text' })
  summary?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  featuredImage?: string;
}
