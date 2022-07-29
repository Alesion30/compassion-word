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
  if (typeof qtext === "string" && qtext !== "") {
    try {
      const result = await asari(qtext);
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
