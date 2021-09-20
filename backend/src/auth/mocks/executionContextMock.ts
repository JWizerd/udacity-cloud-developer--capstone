export const mockHeaderFn = jest.fn();

export const ExecutionContextMock = function (value, param = 1) {
  return {
    switchToHttp() {
      return {
        getRequest() {
          return {
            params: {
              id: param,
            },
            header() {
              return value;
            },
          };
        },
      };
    },
  };
};
