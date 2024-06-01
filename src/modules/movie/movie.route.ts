/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { MovieControllers } from "./movie.controller";

const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const movieData = req.body;

//     const result = await Movie.create(movieData);

//     res.status(200).json({
//       success: true,
//       message: "Movie is created successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       error: err,
//     });
//   }
// });

router.post("/", MovieControllers.createMovie);
router.get("/", MovieControllers.getAllMovies);
router.get("/trending", MovieControllers.getTrendingMovies);
router.get("/new-release", MovieControllers.getNewReleaseMovies);
//router.get("/upcoming", MovieControllers.);
router.get("/:slug", MovieControllers.getMoviesBySlug);

export const MovieRoutes = router;
