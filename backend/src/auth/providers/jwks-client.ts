import { JwksClient as JwksClientLib } from 'jwks-rsa';

export const JwksClient = {
  provide: 'JWKS_CLIENT',
  useFactory: () => {
    return new JwksClientLib({
      jwksUri: process.env.AUTH0_JWKS_ENDPOINT,
    });
  },
};
