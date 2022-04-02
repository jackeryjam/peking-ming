export function timeoutMiddleware<
  AsyncFn extends (...argv: any[]) => Promise<any>
>(fn: AsyncFn, options?: { timeout?: number; error?: Error }) {
  const { timeout = 10000, error = new Error("Timeout Error") } = options;
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args)
        .then(resolve)
        .catch(reject);
      setTimeout(() => reject(error), timeout);
    });
  } as AsyncFn;
}
