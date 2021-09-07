import { verify, decode } from 'jsonwebtoken';

export const JwtManagerCustom = {
  provide: 'JWT_MANAGER_CUSTOM',
  useFactory: () => {
    return {
      verify,
      decode,
    };
  },
};
