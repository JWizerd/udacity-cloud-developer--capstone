import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload } from '../auth/types/jwt-payload.interface';
import { Jwt } from '../auth/types/jwt.interface';
import { JwksClient } from 'jwks-rsa';
import logStatements from './log-statements';

@Injectable()
export class AuthService {
  constructor(
    @Inject('JWT_MANAGER_CUSTOM') private readonly jwtManager: any,
    @Inject('JWKS_CLIENT') private readonly jwksClient: JwksClient,
  ) {}

  async verifyToken(authHeader: string): Promise<JwtPayload> {
    const token = this.getToken(authHeader);
    const tokenDecoded = this.decodeToken(token);
    const signingKey = await this.getSigningKey(tokenDecoded);
    return this.jwtManager.verify(token, signingKey) as JwtPayload;
  }

  decodeToken(token: string) {
    const jwt = this.jwtManager.decode(token, { complete: true }) as Jwt;
    if (!jwt.header.kid) throw new Error(logStatements.decodeToken.error.noKid);
    return jwt;
  }

  getUser(authHeader: string): Jwt {
    const token = this.getToken(authHeader);
    return this.decodeToken(token);
  }

  async getSigningKey(jwt: Jwt): Promise<string> {
    const signingKey = await this.jwksClient.getSigningKey(jwt.header.kid);
    if (!signingKey) {
      throw new Error(logStatements.getSigningKey.error.noAssocKey);
    }
    return signingKey.getPublicKey();
  }

  getToken(authHeader: string): string {
    if (!authHeader) throw new Error(logStatements.getToken.error.noheader);

    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      throw new Error(logStatements.getToken.error.invalidHeader);
    }
    const split = authHeader.split(' ');
    const token = split[1];

    return token;
  }

  parseUserId(jwtToken: string): string {
    const decodedJwt = this.jwtManager.decode(jwtToken) as JwtPayload;
    return decodedJwt.sub;
  }
}
