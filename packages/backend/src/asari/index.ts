import { python } from "../utils/python.js";

type Class = "negative" | "positive";

export type Asari = {
  text: string;
  top_class: Class;
  classes: {
    class_name: Class;
    confidence: number;
  }[];
};

/**
 * テキストから感情を抽出する
 * https://github.com/Hironsan/asari
 */
const asari = async (text: string) => {
  const result = await python<Asari>("src/asari/index.py", [text]);
  return result;
};

export default asari;
