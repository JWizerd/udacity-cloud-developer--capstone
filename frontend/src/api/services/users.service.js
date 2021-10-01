import Service from "./base.service";

export class UserService extends Service {
  constructor(axios) {
    super(axios, 'users');
  }

  async me() {
    const { data: user } = await this.axios.get(`${this.resource}/me`);
    return user;
  }
}