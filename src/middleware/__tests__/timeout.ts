import { delay } from "@/promise";
import { timeoutMiddleware } from "../index";

test("timeoutMiddleware", async () => {
  const func = async (num: number, time: number) => {
    await delay(time);
    return num
  };
  const enhanceFunc = timeoutMiddleware(func, { timeout: 300 });
  expect(await enhanceFunc(1, 100)).toBe(1);
  expect(await enhanceFunc(1, 400).catch(() => 2)).toBe(2);
});
