import { PythonShell } from "python-shell";

type Pymlask = {
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

export const pymlask = (text: string) => {
  return new Promise<Pymlask>((resolve, reject) => {
    PythonShell.run(
      "src/pymlask.py",
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
