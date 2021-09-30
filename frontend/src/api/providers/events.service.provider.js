import { EventsService } from "../services/events.service";

export const eventsServiceProvider = (container) => {
  return new EventsService(container.axios, 'marketplaces/:marketplaceId/events');
}