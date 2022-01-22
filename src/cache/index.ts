import { simpleHash } from "../hash";
import { sortStringify } from "../string";

export interface MemorizeAsyncFuncOptions {
  expiry?: number;
  cacheSize?: number;
}

export function memorizeAsyncFunc<
  AsyncFn extends (...argv: any[]) => Promise<any>
>(func: AsyncFn, options?: MemorizeAsyncFuncOptions) {
  const { expiry = 3000, cacheSize = 100 } = options || {};
  const cache: {
    [key: string]: { data: any; updateTime: number; promise?: Promise<any> };
  } = {};
  let catchKeys: string[] = [];
  const setCache = (key: string, data: any, promise?: Promise<any>) => {
    if (cache[key]) {
      catchKeys = catchKeys.filter((val) => val !== key);
    }
    catchKeys.push(key);
    cache[key] = {
      data,
      updateTime: Date.now(),
      promise,
    };
  };

  const clearExpiredKeys = () => {
    const nowTime = Date.now();
    catchKeys = catchKeys.filter((key) => {
      const { updateTime } = cache[key];
      if (updateTime + expiry < nowTime) {
        delete cache[key];
        return false;
      } else {
        return true;
      }
    });
  };

  const overLimitCacheNum = () => {
    while (catchKeys.length > cacheSize) {
      const key = catchKeys.shift();
      delete cache[key];
    }
  };

  return async function (...args) {
    const key = simpleHash(sortStringify(args));

    let result;
    // 清除过期key值
    clearExpiredKeys();
    // 清除多出key值
    overLimitCacheNum();

    if (!cache[key]) {
      const fetchPromise = func.apply(this, args);
      setCache(key, null, fetchPromise);
      result = await fetchPromise;
      setCache(key, result);
    } else if (!cache[key].data && cache[key].promise) {
      result = await cache[key].promise;
    } else {
      result = cache[key].data;
    }

    return Promise.resolve(result);
  } as AsyncFn;
}
