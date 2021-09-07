export const mockHeaderFn = jest.fn();

export const ExecutionContextMock = function (value) {
  return {
    switchToHttp() {
      return {
        getRequest() {
          return {
            header() {
              return value;
            },
          };
        },
      };
    },
  };
};
