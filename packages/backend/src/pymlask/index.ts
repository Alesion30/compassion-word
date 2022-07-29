import { PythonShell } from "python-shell";

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
const pymlask = (text: string) => {
  return new Promise<Pymlask>((resolve, reject) => {
    PythonShell.run(
      "src/pymlask/index.py",
      {
        mode: "json",
        pythonPath: "python",
        pythonOptions: [],
        args: [text],
      },
      (err, results) => {
        console.log("results", results);

        if (err) {
          reject(err);
        }

        if (results === undefined) {
          reject("result not found");
        }

        if (results) {
          resolve(results[0]);
        }
      }
    );
  });
};

export default pymlask;
