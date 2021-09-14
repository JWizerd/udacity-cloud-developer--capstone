import { createParamDecorator } from '@nestjs/common';

export const AuthUserParam: () => ParameterDecorator = () => {
  return createParamDecorator((_data, req) => {
    return req.user;
  });
};
