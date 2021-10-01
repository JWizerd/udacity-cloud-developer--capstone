import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Marketplace } from '../marketplaces/marketplace.entity';
import { User } from '../users/user.entity';

@Entity()
export class MarketplaceReview extends BaseEntity {
  constructor(review?: MarketplaceReview) {
    super();

    if (review) {
      Object.assign(review, this);
    }
  }

  @ManyToOne(() => Marketplace, (marketplace) => marketplace.events, {
    onDelete: 'CASCADE',
  })
  marketplace?: Marketplace;

  @ManyToOne(() => User, (user) => user.reviews, { eager: true })
  user?: User;

  @Column({ nullable: false, type: 'text' })
  review?: string;

  @Column({ nullable: false, type: 'int' })
  rating?: number;
}
