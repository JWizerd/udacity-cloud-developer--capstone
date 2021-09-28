import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwksClient } from './providers/jwks-client';
import { JwtManagerCustom } from './providers/jwt-manager';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  providers: [AuthService, JwksClient, JwtManagerCustom, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
