const getType = (o: any) => Object.prototype.toString.call(o).slice(8, -1);

export const toCamelStr = (str: string) =>
  str.replace(/[_\s](.)/g, ($1) => $1.toUpperCase()).replace(/[_\s]/g, "");

export const toUnderscoreStr = (str: string) => (str: string) =>
  str.replace(/[A-Z](.)/g, ($1) => `_${$1.toLowerCase()}`);

export const toDashStr = (str: string) =>
  str
    .trim()
    .replace(/(\s)/g, () => `-`)
    .replace(/[A-Z](.)/g, ($1: string) => `-${$1.toLowerCase()}`);

const caseTransformer = (transFunc: Function) => {
  const func = (s: any, recursion = true) => {
    const type = getType(s);
    switch (type) {
      case "Array":
        return s.map((item: any) => {
          const itemType = getType(item);
          if ((itemType === "Object" || itemType === "Array") && recursion)
            item = func(item, recursion);
          return item;
        });
      case "Object":
        const res: any = {};
        for (let k in s) {
          let value = s[k];
          const valueType = getType(value);
          if ((valueType === "Object" || valueType === "Array") && recursion)
            value = func(value, recursion);
          res[transFunc(k)] = value;
        }
        return res;
      case "String":
        return transFunc(s);
      default:
        return s;
    }
  };
  return func;
};

export const toCamel = caseTransformer(toCamelStr);
export const toUnderscore = caseTransformer(toUnderscoreStr);
export const toDash = caseTransformer(toDashStr);
