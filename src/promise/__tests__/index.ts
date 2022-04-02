import { delay, timeoutLimit } from "../index";

test("test timeoutLimit", async () => {
  const func = async (num: number, time: number) => {
    await delay(time);
    return num;
  };
  const res1 = await timeoutLimit(func(1, 100), { timeout: 200 });
  expect(res1).toBe(1);
  const res2 = await timeoutLimit(func(1, 300), { timeout: 200 }).catch(
    () => 2
  );
  expect(res2).toBe(2);
});
