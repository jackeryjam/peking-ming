/**
 * 转为安全的html文本
 * @param text 
 * @returns 
 */
export const toSafeHtmlText = (text: string) => {
  let textNode = document.createTextNode(text);
  let div = document.createElement("div");
  div.append(textNode);
  return div.innerHTML;
};
