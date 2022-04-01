import { combineMiddleWare } from "../index";

class TestMiddleWare {
  test() {
    const fn = (val: number) => console.log(val);
    const middle1 = (func: typeof fn, msg: string) => {
      return (val: number) => {
        console.log(msg);
        return func(val);
      };
    };
    const middle2 = (func: typeof fn, msg: string) => {
      return (val: number) => {
        console.log("middle2", msg);
        return func(val);
      };
    };

    const newFn = combineMiddleWare([
      (func: any) => middle1(func, "hello"),
      (func: any) => middle2(func, "hello2"),
    ])(fn);
    newFn(111);
  }

  main() {
    this.test();
  }
}

new TestMiddleWare().test();

// test("decorator limitflow", async () => {
//   const testInstance = new TestClass();

//   const startTime = Date.now();
//   // 大于三秒说明有限流处理
//   const res = await Promise.all(
//     Array.from({ length: 30 }).map(() => testInstance.testFunction())
//   );
//   const costTime = Date.now() - startTime;
//   expect(costTime > 3000).toBeTruthy();
//   // 函数调用的this没问题
//   expect(testInstance.limitCallTime).toBe(30);
//   res.every((item) => item === 1);
//   // 保证结果的正确性
//   expect(res.every((item) => item === 1)).toBeTruthy();
// });
