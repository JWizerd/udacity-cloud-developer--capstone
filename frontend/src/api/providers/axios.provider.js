import rateLimiter from "axios-rate-limit";
import axios from "axios";

export const axiosServiceProvider = (container, config) => {
  if (!config) throw new Error("Axios Provider requires a config");

  container.bind('axios', rateLimiter(
    axios.create(config.axios),
    config.rateLimiterSettings
  ));
}