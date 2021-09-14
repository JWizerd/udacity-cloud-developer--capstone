import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwksClient } from './providers/jwks-client';
import { JwtManagerCustom } from './providers/jwt-manager';
import { AuthGuard } from './auth.guard';
import { AttachUserInterceptor } from './attach-user.interceptor';

@Module({
  providers: [
    AuthService,
    JwksClient,
    JwtManagerCustom,
    AuthGuard,
    AttachUserInterceptor,
  ],
  exports: [AuthService, AuthGuard, AttachUserInterceptor],
})
export class AuthModule {}
