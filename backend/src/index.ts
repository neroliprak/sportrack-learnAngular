import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 5001;

app.get("/", (req: Request, res: Response) => res.send("Hello world!"));

app.listen(PORT, () =>
  console.log(`Server running on http://127.0.0.1:${PORT}`)
);
