import { Request, Response } from "express";
import { MovieServices } from "./movie.service";

const createMovie = async (req: Request, res: Response) => {
  try {
    const movieData = req.body;

    const result = await MovieServices.createMovieIntoDB(movieData);

    res.status(200).json({
      success: true,
      message: "Movie is created successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieServices.getAllMoviesFromDB();

    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch movies!",
      error: err,
    });
  }
};
const getSingleMovie = async (req: Request, res: Response) => {
  try {

    const { movieId } = req.params;

    const result = await MovieServices.getSingleMovieFromDB(movieId);

    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully !",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch movies!",
      error: err,
    });
  }
};

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getSingleMovie,

};

















// const getTrendingMovies = async (req: Request, res: Response) => {
//   try {
//     const result = await MovieServices.getTrendingMovies();

//     res.status(200).json({
//       success: true,
//       message: "Movies are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch movies!",
//       error: err,
//     });
//   }
// };
// const getNewReleaseMovies = async (req: Request, res: Response) => {
//   try {
//     const result = await MovieServices.getNewReleaseMovies();

//     res.status(200).json({
//       success: true,
//       message: "Movies are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch movies!",
//       error: err,
//     });
//   }
// };