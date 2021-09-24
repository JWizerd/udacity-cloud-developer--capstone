import { marketsServiceProvider } from "./markets.service.provider";
import { axiosServiceProvider } from "./axios.provider";
import { usersServiceProvider } from "./user.service.provider";
import { filesServiceProvider } from "./files.service.provider";

export default [
  usersServiceProvider,
  axiosServiceProvider,
  filesServiceProvider,
  marketsServiceProvider,
];