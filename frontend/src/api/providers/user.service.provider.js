import { UserService } from "../services/users.service";
export const usersServiceProvider = (container) => {
  return new UserService(container.axios);
}