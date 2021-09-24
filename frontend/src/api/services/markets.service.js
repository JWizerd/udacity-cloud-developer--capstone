import Service from "./base.service";
export class MarketService extends Service {
  constructor(axios, resource, filesService) {
    super(axios, resource);
    this.filesService = filesService;
  }

  async create(market, altImageId = Date.now()) {
    if (!market.featuredImage) throw new Error('Featured image is required.');
    const attachmentUrl = await this.filesService.upload(`market-${altImageId}`, market.featuredImage);
    market.featuredImage = attachmentUrl;
    const { data: newMarket } = await this.axios.post(this.resource, market);
    return newMarket;
  }

  async update(market, altImageId = Date.now()) {
    const { id, ...fields } = market;
    if (!fields.featuredImage) throw new Error('Featured image is required.');
    if (typeof fields.featuredImage === "object") {
      const attachmentUrl = await this.filesService.upload(`market-${altImageId}`, fields.featuredImage);
      market.featuredImage = attachmentUrl;
    }

    const { data: newMarket } = await this.axios.patch(`${this.resource}/${id}`, fields);
    return newMarket;
  }

  async duplicate(market) {
    delete market.id;
    market.name = `COPY - ${market.name}`;
    const { data: newMarket } = await this.axios.post(this.resource, market);
    return newMarket;
  }
}