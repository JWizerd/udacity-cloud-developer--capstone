/**
 * This function is intended for error handling in components to ensure components
 * know nothing about the underlying api integration but receive the proper error message
 *
 * in addition, this fn can possibly return a value from an action while it is
 * not recommended as it violates the uni-directional data flow pattern.
 *
 * @param {Function} action
 * @param {*} args
 * @returns Promise<any>
 */
export const actionResolver = (action, ...args) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await action.apply(null, args));
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        reject(error.response.data.message);
      } else {
        reject(error);
      }
    }
  })
}