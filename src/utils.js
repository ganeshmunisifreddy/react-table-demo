export const getDataFromPath = (path, obj) => {
  const props = path.split(".");
  return props.reduce((acc, prop) => acc[prop], obj);
};
