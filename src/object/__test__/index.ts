import { sortObject } from "../index";

class Test {
  sortObject = () => {
    const a = {
      b: "b",
      a: "a",
    };
    const res = sortObject(a);
    // expect(JSON.stringify(res)).toBe('{"a":"a","b":"b"}');
    console.log(JSON.stringify(res));
    const b = {
      b: "b",
      a: a,
    };
    const res2 = sortObject(b);
    console.log(JSON.stringify(res2));
    const res3 = sortObject(b, { deep: 2 });
    console.log(JSON.stringify(res3));
  };
}

// test("sortObject", async () => {
//   // const testInstance = new TestClass();
//   // const startTime = Date.now();
//   // // 大于三秒说明有限流处理
//   // const res = await Promise.all(
//   //   Array.from({ length: 30 }).map(() => testInstance.testFunction())
//   // );
//   // const costTime = Date.now() - startTime;
//   // expect(costTime > 3000).toBeTruthy();
//   // // 函数调用的this没问题
//   // expect(testInstance.limitCallTime).toBe(30);
//   // res.every((item) => item === 1);
//   // // 保证结果的正确性
//   // expect(res.every((item) => item === 1)).toBeTruthy();
// });

const test = new Test();
test.sortObject();
