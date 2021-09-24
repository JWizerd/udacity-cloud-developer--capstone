export class ApiError extends Error {
  constructor(error) {
    super(error.response ? error.response.data.message : error.message);
  }
}