import { axiosServiceProvider } from "../providers/axios.provider";
import { containerMock, validConfigMock, axiosMock } from "../mocks";

describe('serviceProviders.axiosServiceProvider', () => {
  it('should call container.bind with correct params', () => {
    const axiosCreateSpy = jest.spyOn(axiosMock, 'create').mockReturnValue(axiosMock);
    const rateLimiterSpy = jest.fn().mockReturnValue(axiosMock);

    axiosServiceProvider(containerMock, validConfigMock, rateLimiterSpy, axiosMock);

    expect(axiosCreateSpy).toHaveBeenCalledWith(validConfigMock.axios);
    expect(rateLimiterSpy).toHaveBeenCalledWith(axiosMock, validConfigMock.rateLimiterSettings);
  });
});