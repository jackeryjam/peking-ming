export const combineMiddleWare = <Fn>(fnList: ((fn: any) => any)[]) => {
  return (fn: Fn) => {
    let res = fn;
    for (let middleItem of fnList.reverse()) {
      res = middleItem(res);
    }
    return res;
  };
};
