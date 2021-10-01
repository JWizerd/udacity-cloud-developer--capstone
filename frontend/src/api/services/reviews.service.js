import Service from "./base.service";

export class ReviewsService extends Service {
  constructor(axios) {
    super(axios, 'marketplaces/:marketplaceId/reviews');
  }
}