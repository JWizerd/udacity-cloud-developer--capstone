import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwksClient } from './providers/jwks-client';
import { JwtManagerCustom } from './providers/jwt-manager';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService, JwksClient, JwtManagerCustom, AuthGuard],
})
export class AuthModule {}
