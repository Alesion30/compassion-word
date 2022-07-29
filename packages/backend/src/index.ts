import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import asari from "./asari/index.js";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
  const qtext = req.query.text;
  console.log(qtext);
  if (typeof qtext !== "string" || qtext === "") {
    return res.status(404).send("typeof qtext !== string || qtext === ''");
  }

  try {
    const result = await asari(qtext);
    const positive =
      result.classes.find((v) => v.class_name === "positive")?.confidence ?? 0;
    const negative =
      result.classes.find((v) => v.class_name === "negative")?.confidence ?? 0;

    if (positive >= negative) {
      return res.send(qtext + "😆");
    } else {
      return res.send(qtext + "😢");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`);
});
