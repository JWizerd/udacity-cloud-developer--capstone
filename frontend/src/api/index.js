import rateLimiter from "axios-rate-limit";
import axios from "axios";
import { getConfig } from "./config";

export default function apiClientFactory (options) {
  const config = getConfig(options);
  return rateLimiter(
    axios.create(config.axios),
    config.rateLimiterSettings
  );
}

