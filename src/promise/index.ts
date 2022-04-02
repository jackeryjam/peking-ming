export const delay = (milisec: number) =>
  new Promise((res) => setTimeout(res, milisec));

export const promisify =
  <T extends (...args: any[]) => any, R>(fun: T, ctx = null) =>
  (...args: Parameters<T>): Promise<R> =>
    new Promise((resolve) => fun.apply(ctx, [...args, resolve]));

export const timeoutLimit = (p: Promise<any>, options: { timeout: number }) =>
  new Promise((resolve, reject) => {
    p.then(resolve).catch(reject);
    setTimeout(() => reject(new Error("Timeout Error")), options?.timeout);
  });
