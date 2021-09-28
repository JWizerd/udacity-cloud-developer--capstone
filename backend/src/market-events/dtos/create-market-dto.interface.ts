export interface CreateMarketDTO {
  name: string;
  description: string;
  summary: string;
  featuredImage?: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  zipcode: number;
  address: string;
}
