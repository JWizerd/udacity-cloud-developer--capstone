export default class Service {
  constructor(axios, resource) {
    this.axios = axios;
    this.resource = resource;
  }

  setGlobalHeader(headerName, value) {
    this.axios.defaults.headers.common[headerName] = value;
  }

  async create(data) {
    const { data: entity } =  await this.axios.post(this.resource, data);
    return entity;
  }

  async findOne(id) {
    const { data: entity } = await this.axios.get(`${this.resource}/${id}`);
    return entity;
  }

  async find(params = {}) {
    const { data: list } = await this.axios.get(this.resource, { params });
    return list;
  }

  async remove(id) {
    await this.axios.delete(`${this.resource}/${id}`);
  }

  async update(id, data) {
    const { data: entity } = await this.axios.patch(`${this.resource}/${id}`, data);
    return entity;
  }

  async put(id, data) {
    const { data: entity } = await this.axios.put(`${this.resource}/${id}`, data);
    return entity;
  }
}