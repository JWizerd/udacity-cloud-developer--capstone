import Service from "./base.service";
export class MarketService extends Service {
  constructor(axios, resource, fileService) {
    super(axios, resource);
    this.filesService = fileService;
  }
}