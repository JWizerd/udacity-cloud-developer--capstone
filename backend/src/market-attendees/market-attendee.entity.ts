import { BaseEntity } from '../typeorm/base.entity';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Transform } from 'class-transformer';
import { Market } from '../markets/market.entity';

@Entity()
export class MarketAttendee extends BaseEntity {
  constructor(market?: MarketAttendee) {
    super();

    if (market) {
      Object.assign(market, this);
    }
  }

  @OneToOne(() => User)
  @Transform(({ value }) => {
    delete value.email;
    return value;
  })
  @JoinColumn()
  user?: User;

  @ManyToOne(() => Market, (market) => market.attendees)
  market: Market;

  @Column({ nullable: false, unique: true })
  rsvpDetails?: string;
}
