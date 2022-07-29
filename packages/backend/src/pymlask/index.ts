import { python } from "../utils/python.js";

export type Pymlask = {
  text: string;
  emotion: { [key in string]: string[] } | null;
  orientation: string;
  activation: string;
  emoticon: string[];
  intension: number;
  intensifier: {
    exclamation: string[];
    emotikony: string[];
  };
  representative: (string | string[])[];
};

/**
 * テキストから感情を抽出する
 * https://github.com/ikegami-yukino/pymlask
 */
const pymlask = async (text: string) => {
  const result = await python<any>("src/pymlask/index.py", [text]);
  return result;
};

export default pymlask;
