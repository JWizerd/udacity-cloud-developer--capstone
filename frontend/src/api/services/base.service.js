import { ApiError } from "../api.error";

export default class Service {
  constructor(axios, resource) {
    this.axios = axios;
    this.resource = resource;
  }

  async create(data) {
    try {
      const { data: entity } =  await this.axios.post(this.resource, data);
      return entity;
    } catch(error) {
      throw new ApiError(error);
    }
  }

  async findOne(id) {
    try {
      const { data: entity } = await this.axios.get(`${this.resource}/${id}`);
      return entity;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async find(params = {}) {
    try {
      const { data: list } = await this.axios.get(this.resource, { params });
      return list;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async remove(id) {
    try {
      await this.axios.delete(`${this.resource}/${id}`);
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async update(id, data) {
    try {
      const { data: entity } = await this.axios.patch(`${this.resource}/${id}`, data);
      return entity;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async put(id, data) {
    try {
      const { data: entity } = await this.axios.put(`${this.resource}/${id}`, data);
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
  buildResource(params) {
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