import UserService from "../services/users.service";
export const usersServiceProvider = (container) => {
  container.bind('users',  new UserService(container.axios, container.files));
}