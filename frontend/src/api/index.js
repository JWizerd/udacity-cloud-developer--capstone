
import serviceProviders from "./providers";
import { getConfig } from "./config";
import { Container } from "./container";

export default function (config, container = new Container(), providers = serviceProviders, configMap = getConfig) {
  const clientConfig = configMap(config);

  for (const provider of providers) {
    provider(container, clientConfig);
  }

  return container;
}