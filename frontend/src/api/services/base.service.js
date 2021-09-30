import { ApiError } from "../api.error";

export default class Service {
  constructor(axios, resource) {
    this.axios = axios;
    this.resource = resource;
  }

  async create(data, params) {
    try {
      const { data: entity } =  await this.axios.post(this.buildResource(params), data);
      return entity;
    } catch(error) {
      throw new ApiError(error);
    }
  }

  async findOne(id, params) {
    try {
      const { data: entity } = await this.axios.get(`${this.buildResource(params)}/${id}`);
      return entity;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async find(params = {}, urlParams) {
    try {
      const { data: list } = await this.axios.get(this.buildResource(urlParams), { params });
      return list;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async remove(id, params) {
    try {
      await this.axios.delete(`${this.buildResource(params)}/${id}`);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async update(id, data, params) {
    try {
      const { data: entity } = await this.axios.patch(`${this.buildResource(params)}/${id}`, data);
      return entity;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async put(id, data, params) {
    try {
      const { data: entity } = await this.axios.put(`${this.buildResource(params)}/${id}`, data);
      return entity;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  /**
   * Builds a url path based on the resource template,
   * and params passed into the request method
   *
   * @param {*} params
   * @returns
   */
  buildResource(params = {}) {
    const slugs = this.resource.split('/');

    if (slugs.length === 1) return this.resource;

    for (let index = 0; index < slugs.length; index++) {
      let slug = slugs[index];
      if (!slug.includes(':') ) continue;
      slugs[index] = this._getParamValue(slug, params);
    }

    return slugs.join('/');
  }

  _getParamValue(slug, params) {
    const formattedSlug = slug.replace(':', '');
    if (!params[formattedSlug]) throw new Error(`${formattedSlug} parameter must be set`);
    return params[formattedSlug];
  }
}