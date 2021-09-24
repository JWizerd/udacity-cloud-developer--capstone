import rateLimiter from "axios-rate-limit";
import axios from "axios";

export const axiosServiceProvider = (container, config, rateLimiterFn = rateLimiter, axiosClient = axios) => {
  if (!config) throw new Error("Axios Provider requires a config");

  return rateLimiterFn(
    axiosClient.create(config.axios),
    config.rateLimiterSettings
  );
}