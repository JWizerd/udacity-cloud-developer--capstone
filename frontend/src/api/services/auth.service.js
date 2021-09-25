export class AuthService {
  constructor(axios) {
    this.axios = axios;
  }

  login(token) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  logout() {
    delete this.axios.defaults.headers.common.Authorization;
  }
}