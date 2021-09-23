import { marketsServiceProvider } from "./markets.service.provider";
import { axiosServiceProvider } from "./axios.provider";
import { usersServiceProvider } from "./user.service.provider";

export const providers = [
  marketsServiceProvider,
  usersServiceProvider,
  axiosServiceProvider
];