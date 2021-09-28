import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Transform } from 'class-transformer';
import { MarketEvent } from '../market-events/market-event.entity';

@Entity()
export class MarketAttendee extends BaseEntity {
  constructor(market?: MarketAttendee) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @OneToOne(() => User, { eager: true })
  @Transform(({ value }) => {
    delete value.email;
    return value;
  })
  @JoinColumn()
  user?: User;

  @ManyToOne(() => MarketEvent, (market) => market.attendees)
  event: MarketEvent;

  @Column({ nullable: false })
  rsvpDetails?: string;

  @Column({ default: 0, type: 'int' })
  additionalPeople?: number;
}
