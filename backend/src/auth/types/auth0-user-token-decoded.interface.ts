export interface Auth0UserTokenDecoded {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  email: string;
  email_verified: boolean;
  sub: string;
}
