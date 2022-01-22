/**
 * 有序的stringify
 * {v: 1, d: 3, a: {d: 2, a: 2: e: 4}}
 * {"a":{"a":2,"d":2,"e":4},"d":3,"v":1}
 * @param key
 * @param value
 * @returns
 */

export function replacer(key: string, value: any) {
  if (
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Object]"
  ) {
    return Object.keys(value)
      .sort()
      .reduce(
        (result, item) => Object.assign(result, { [item]: value[item] }),
        {}
      );
  }
  return value;
}

export const sortStringify = (obj: any) => {
  return JSON.stringify(obj, replacer);
};
