import Service from "./base.service";

export class EventsService extends Service {
  constructor(axios) {
    super(axios, 'marketplaces/:marketplaceId/events');
  }
}