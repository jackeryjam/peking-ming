export function limitFlow<Fn extends (...arg: any[]) => Promise<any>>(
  fn: Fn,
  limitNumber = 10
) {
  const waitListener: ((argv: any) => void)[] = [];
  let pendingCount = 0;
  return async function (...argv) {
    if (pendingCount >= limitNumber) {
      await new Promise((resolve) => waitListener.push(resolve));
    }
    pendingCount++;
    try {
      return await fn.apply(this, argv);
    } finally {
      pendingCount--;
      waitListener.shift()?.(null);
    }
  } as Fn;
}
