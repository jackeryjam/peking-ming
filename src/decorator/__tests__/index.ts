import { limitFlow, memorize } from "../index";
import { delay } from "@/promise";

class TestClass {
  limitCallTime = 0;
  @limitFlow({ limitNumber: 10 })
  async testFunction() {
    this.limitCallTime++;
    await delay(1000);
    return 1;
  }

  memoCallTime = 0;
  @memorize({ expiry: 200 })
  async testMemoFunction() {
    this.memoCallTime++;
    return 1;
  }
}

/**
 * 1. 有限制效果
 * 2. 函数调用的this没问题
 * 3. 结果正确
 */
test("decorator limitflow", async () => {
  const testInstance = new TestClass();

  const startTime = Date.now();
  // 大于三秒说明有限流处理
  const res = await Promise.all(
    Array.from({ length: 30 }).map(() => testInstance.testFunction())
  );
  const costTime = Date.now() - startTime;
  expect(costTime > 3000).toBeTruthy();
  // 函数调用的this没问题
  expect(testInstance.limitCallTime).toBe(30);
  res.every((item) => item === 1);
  // 保证结果的正确性
  expect(res.every((item) => item === 1)).toBeTruthy();
});

/**
 * 1. 函数调用有缓存和分发的效果
 * 2. 函数调用的this没问题
 * 3. 返回结果正确
 */
test("decorator memorize", async () => {
  const testInstance = new TestClass();
  const res = await Promise.all(
    Array.from({ length: 10 }).map(() => testInstance.testMemoFunction())
  );
  // 保证结果的正确性
  expect(res.every((item) => item === 1)).toBeTruthy();
  // 调用次数只能有一次
  expect(testInstance.memoCallTime).toBe(1);

  await delay(500);
  await Promise.all(
    Array.from({ length: 10 }).map(() => testInstance.testMemoFunction())
  );
  // 调用次数只能有一次
  expect(testInstance.memoCallTime).toBe(2);
});
