import { marketsServiceProvider } from "./markets.service.provider";
import { axiosServiceProvider } from "./axios.provider";
import { usersServiceProvider } from "./user.service.provider";
import { filesServiceProvider } from "./files.service.provider";
import { authServiceProvider } from "./auth.provider";

export default {
  axios: axiosServiceProvider,
  auth: authServiceProvider,
  users: usersServiceProvider,
  files: filesServiceProvider,
  markets: marketsServiceProvider,
};