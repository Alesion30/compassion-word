import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import pymlask from "./pymlask/index.js";

const PORT = 3000;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
  const qtext = req.query.text;
  if (typeof qtext === "string" && qtext !== "") {
    try {
      const result = await pymlask(qtext);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } else {
    res.status(404).send("");
  }
});

app.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`);
});
