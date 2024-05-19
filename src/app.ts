import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { MovieRoutes } from "./modules/movie/movie.route";
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/movies", MovieRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
