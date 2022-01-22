import { limitFlow as _limitFlow } from "../promise/limitFlow";
import { memorizeAsyncFunc, MemorizeAsyncFuncOptions } from "../cache";

/**
 * 限流装饰器
 * @param options
 * @returns
 */
export function limitFlow(options?: { limitNumber?: number }) {
  const { limitNumber = 10 } = options || {};
  return function (target, name, descriptor) {
    descriptor.value = _limitFlow(descriptor.value, limitNumber);
    return descriptor;
  };
}

/**
 * 缓存装饰器
 * @param options
 * @returns
 */
export function memorize(options?: MemorizeAsyncFuncOptions) {
  return function (target, name, descriptor) {
    descriptor.value = memorizeAsyncFunc(descriptor.value, options);
    return descriptor;
  };
}
