import { MarketplacesService } from "../services/marketplaces.service";
export const marketsServiceProvider = (container) => {
  return new MarketplacesService(container.axios, 'marketplaces', container.files);
}