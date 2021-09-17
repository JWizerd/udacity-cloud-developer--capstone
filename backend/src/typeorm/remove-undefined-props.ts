export const removeUndefinedProps = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
