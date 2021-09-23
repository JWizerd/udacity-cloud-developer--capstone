import { getConfig } from "../config";
import { configMock } from "../mocks";

describe('getConfig', () => {
  it('should return a valid config', () => {
    const validConfig = {
      axios: {
        baseURL: configMock.baseURL,
        timeout: configMock.timeout,
      },
      rateLimiterSettings: {
        maxRequests: configMock.maxRequests,
        perMilliseconds: 1000
      }
    }

    const config = getConfig(configMock);
    expect(config).toEqual(validConfig);
  });

  it('should append auth headers if token provided', () => {
    const validConfig = {
      axios: {
        baseURL: configMock.baseURL,
        timeout: configMock.timeout,
        headers: {
          Authorization: `Bearer abc123`,
        }
      },
      rateLimiterSettings: {
        maxRequests: configMock.maxRequests,
        perMilliseconds: 1000
      }
    }

    configMock.token = 'abc123';
    const config = getConfig(configMock);
    expect(config).toEqual(validConfig);
  });

  it('should set defaults on config', () => {
    const validConfig = {
      axios: {
        baseURL: configMock.baseURL,
        timeout: 5000,
      },
      rateLimiterSettings: {
        maxRequests: 2,
        perMilliseconds: 1000
      }
    }

    const config = getConfig({ baseURL: configMock.baseURL });
    expect(config).toEqual(validConfig);
  });
});