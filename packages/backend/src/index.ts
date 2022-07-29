import express, { Request, Response } from "express";
import { pymlask } from "./pymlask.js";

const PORT = 3000;
const app = express();

app.get("/", async (req: Request, res: Response) => {
  const text = await pymlask("彼のことは嫌いではない！(;´Д`)");
  res.send(text);
});

app.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`);
});
