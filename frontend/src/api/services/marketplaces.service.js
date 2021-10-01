import Service from "./base.service";
import { ApiError } from "../api.error";
export class MarketplacesService extends Service {
  constructor(axios, filesService) {
    super(axios, 'marketplaces');
    this.filesService = filesService;
  }

  async create(market, altImageId = Date.now()) {
    try {
      if (!market.featuredImage) throw new Error('Featured image is required.');
      await this.attachImage(market, altImageId);
      const { data: newMarket } = await this.axios.post(this.resource, market);
      return newMarket;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async update(market, altImageId = Date.now()) {
    try {
      const { id, ...fields } = market;
      if (!fields.featuredImage) throw new Error('Featured image is required.');
      if (typeof fields.featuredImage === "object") {
        await this.attachImage(fields, altImageId);
      }

      const { data: newMarket } = await this.axios.patch(`${this.resource}/${id}`, fields);
      return newMarket;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async attachImage(marketFields, altImageId) {
    const attachmentUrl = await this.filesService.upload(`marketplace-${altImageId}`, marketFields.featuredImage);
    marketFields.featuredImage = attachmentUrl;
  }
}