import apiClientFactory from "../index";
import { containerMock, configMock } from "../mocks";
import { getConfig } from "../config";

describe('apiClientFactory', () => {
  it('should call apiClientFactory with correct params', () => {
    const config = getConfig(configMock);
    const provider1 = jest.fn();
    const provider2 = jest.fn();
    const providersArray = [provider1, provider2];

    apiClientFactory(configMock, containerMock, providersArray);

    expect(provider1).toHaveBeenCalledWith(containerMock, config);
    expect(provider2).toHaveBeenCalledWith(containerMock, config);
  });
});