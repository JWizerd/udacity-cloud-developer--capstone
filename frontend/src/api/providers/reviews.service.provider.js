import { ReviewsService } from "../services/reviews.service";

export const reviewsServiceProvider = (container) => {
  return new ReviewsService(container.axios, 'marketplaces/:marketplaceId/reviews');
}