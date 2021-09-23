
import { providers as serviceProviders } from "./providers";
import { getConfig } from "./config";
import { Container } from "./container";

export default function (config, c = new Container(), providers = serviceProviders, configMap = getConfig) {
  const clientConfig = configMap(config);
  for (const key in providers) {
    c.service(key, (containerInstance) => {
      providers[key](containerInstance, clientConfig);
    });
  }

  return c;
}