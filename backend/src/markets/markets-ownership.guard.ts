import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OwnershipGuard } from '../auth/ownership.guard';
import { Market } from './market.entity';
import { MarketsService } from './markets.service';

@Injectable()
export class MarketsOwnershipGuard extends OwnershipGuard<Market> {
  constructor(
    protected readonly marketsService: MarketsService,
    protected readonly authService: AuthService,
  ) {
    super(marketsService, authService);
  }
}
