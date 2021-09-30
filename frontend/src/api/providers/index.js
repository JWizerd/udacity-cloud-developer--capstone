import { marketsServiceProvider } from "./marketplaces.service";
import { axiosServiceProvider } from "./axios.provider";
import { usersServiceProvider } from "./user.service.provider";
import { filesServiceProvider } from "./files.service.provider";
import { authServiceProvider } from "./auth.provider";
import { eventsServiceProvider } from "./events.service.provider";

export default {
  axios: axiosServiceProvider,
  auth: authServiceProvider,
  users: usersServiceProvider,
  files: filesServiceProvider,
  marketplaces: marketsServiceProvider,
  events: eventsServiceProvider,
};