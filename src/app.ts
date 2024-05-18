import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();

const a = 10;

app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.send(a);
});

export default app;
