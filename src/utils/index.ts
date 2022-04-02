export const combineMiddleWare = <Fn>(fnList: ((fn: Fn) => Fn)[]) => {
  return (fn: Fn) => {
    let res = fn;
    for (let middleItem of fnList.reverse()) {
      res = middleItem(res);
    }
    return res;
  };
};
