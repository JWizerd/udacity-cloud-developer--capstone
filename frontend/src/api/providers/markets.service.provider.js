import MarketService from "../services/markets.service";
export const marketsServiceProvider = (container) => {
  container.bind('markets',  new MarketService(container.axios, container.files));
}