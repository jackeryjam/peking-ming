export const sortObject = (obj: Object, options?: { deep?: number }) => {
  const { deep = 1 } = options || {};
  if (deep === 0) return obj;
  const keys = Object.keys(obj).sort();
  return keys.reduce((result, key) => {
    return Object.assign(result, {
      [key]:
        typeof obj[key] === "object"
          ? sortObject(obj[key], { deep: deep - 1 })
          : obj[key],
    });
  }, {} as Object);
};
