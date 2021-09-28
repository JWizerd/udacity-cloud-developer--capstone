import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Marketplace } from '../marketplaces/marketplace.entity';
import { User } from '../users/user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class MarketplaceReview extends BaseEntity {
  constructor(review?: MarketplaceReview) {
    super();

    if (review) {
      Object.assign(review, this);
    }
  }

  @ManyToOne(() => Marketplace, (marketplace) => marketplace.events)
  marketplace?: Marketplace;

  @OneToOne(() => User, { eager: true })
  @Transform(({ value }) => {
    delete value.email;
    return value;
  })
  @JoinColumn()
  user?: User;

  @Column({ nullable: false, type: 'text' })
  review?: string;

  @Column({ nullable: false, type: 'int' })
  rating?: number;
}
