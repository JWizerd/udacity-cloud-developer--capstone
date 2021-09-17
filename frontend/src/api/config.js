export const getConfig = (settings) => {
  return {
    axios: {
      baseURL: settings.baseURL,
      timeout: settings.timeout || 5000,
      headers: {
        Authorization: `Bearer ${settings.token}`,
      }
    },
    rateLimiterSettings: {
      maxRequests: settings.maxRequests || 2,
      perMilliseconds: 1000
    }
  };
};