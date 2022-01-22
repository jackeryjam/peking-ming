export const delay = (milisec: number) =>
  new Promise((res) => setTimeout(res, milisec));
