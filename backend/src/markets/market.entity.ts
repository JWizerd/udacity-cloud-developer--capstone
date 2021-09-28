import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { MarketAttendee } from '../market-attendees/market-attendee.entity';
import { Marketplace } from '../marketplaces/marketplace.entity';

@Entity()
export class Market extends BaseEntity {
  constructor(market?: Market) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @ManyToOne(() => Marketplace, (marketplace) => marketplace.markets)
  marketplace?: Marketplace;

  @OneToMany(() => MarketAttendee, (attendee) => attendee.market)
  attendees: MarketAttendee[];

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false })
  summary?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  featuredImage?: string;

  @Column({ nullable: false, type: 'date' })
  startDate?: string;

  @Column({ nullable: false, type: 'date' })
  endDate?: string;

  @Column({ nullable: false })
  address?: string;

  @Column({ nullable: false })
  city?: string;

  @Column({ nullable: false, length: 2 })
  state?: string;

  @Column({ nullable: false, type: 'int' })
  zipcode?: number;
}
