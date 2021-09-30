import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { MarketAttendee } from '../market-attendees/market-attendee.entity';
import { Marketplace } from '../marketplaces/marketplace.entity';

@Entity()
export class MarketEvent extends BaseEntity {
  constructor(market?: MarketEvent) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @ManyToOne(() => Marketplace, (marketplace) => marketplace.events, {
    eager: true,
  })
  marketplace?: Marketplace;

  @OneToMany(() => MarketAttendee, (attendee) => attendee.event)
  attendees: MarketAttendee[];

  @Column({ nullable: false, unique: true })
  name?: string;

  @Column({ nullable: false, type: 'text' })
  description?: string;

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
