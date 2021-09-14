import { CanActivate } from '@nestjs/common';

export class AuthGuardMock implements CanActivate {
  async canActivate(): Promise<boolean> {
    return true;
  }
}
