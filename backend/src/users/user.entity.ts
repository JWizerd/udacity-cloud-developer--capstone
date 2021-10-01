import { Marketplace } from '../marketplaces/marketplace.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { MarketplaceReview } from '../marketplace-reviews/marketplace-review.entity';

@Entity()
export class User {
  constructor(user?: User) {
    if (user) {
      Object.assign(user, this);
    }
  }

  @PrimaryColumn({ nullable: false, unique: true })
  id: string;

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

  @OneToMany(() => MarketplaceReview, (review) => review.user, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  reviews?: Promise<MarketplaceReview[]>;
}
