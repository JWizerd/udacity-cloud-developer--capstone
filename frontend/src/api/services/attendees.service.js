import Service from "./base.service";

export class AttendeesService extends Service {
  constructor(axios) {
    super(axios, 'marketplaces/:marketplaceId/events/:eventId/attendees');
  }
}