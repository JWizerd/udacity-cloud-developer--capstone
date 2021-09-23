export const getConfig = (settings) => {
  if (!settings.baseURL) throw new Error("settings.baseURL provided in api client config.");

  const config = {
    axios: {
      baseURL: settings.baseURL,
      timeout: settings.timeout || 5000,
    },
    rateLimiterSettings: {
      maxRequests: settings.maxRequests || 2,
      perMilliseconds: 1000
    }
  };

  if (settings.token) {
    config.axios.headers = {
      Authorization: `Bearer ${settings.token}`,
    };
  }

  return config;
};