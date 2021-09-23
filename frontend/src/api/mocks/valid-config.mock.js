export const validConfigMock = {
  axios: {
    baseURL: 'https:localhost:3000',
    timeout: 5000,
    headers: {
      Authorization: `Bearer abc123`,
    }
  },
  rateLimiterSettings: {
    maxRequests: 2,
    perMilliseconds: 1000
  }
}