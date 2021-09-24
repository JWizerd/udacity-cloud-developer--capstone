import { MarketService } from "../services/markets.service";
export const marketsServiceProvider = (container) => {
  return new MarketService(container.axios, 'markets', container.files);
}