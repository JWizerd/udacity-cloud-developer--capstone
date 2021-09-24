import apiClientFactory from "../index";
import { containerMock, configMock } from "../mocks";

describe('apiClientFactory', () => {
  it('should call apiClientFactory with correct params', () => {
    const providersArray = { provider1: jest.fn(), provider2: jest.fn() };
    const containerBindSpy = jest.spyOn(containerMock, 'bind');

    apiClientFactory(configMock, containerMock, providersArray);

    expect(containerBindSpy).toHaveBeenCalledTimes(2);
  });
});