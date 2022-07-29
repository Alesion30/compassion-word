import { PythonShell } from "python-shell";

const pyshell = new PythonShell("src/pymlask.py", { mode: "json" });

export const pymlask = (text: string) => {
  return new Promise<any>((resolve, reject) => {
    pyshell.send(text);

    pyshell.on("message", (message) => {
      console.log(message);
      resolve(message);
    });

    pyshell.end((err) => {
      if (err) reject(err);
    });
  });
};
