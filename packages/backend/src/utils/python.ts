import { PythonShell } from "python-shell";

export const python = <T = any>(scriptPath: string, args?: string[]) => {
  return new Promise<T>((resolve, reject) => {
    PythonShell.run(
      scriptPath,
      {
        mode: "json",
        pythonPath: "python",
        pythonOptions: [],
        args: args,
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
