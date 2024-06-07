import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

const createMovie = async (movieData: TMovie) => {
  const result = await Movie.create(movieData);
  return result;
};

const getAllMovies = async (payload: Record<string, unknown>) => {
  let searchTerm = "";
  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }
  // srachable of fileds= titles, genre
  const searchableFields = ["title", "genre"];

  const result = await Movie.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  return result;
};

const getMovieBySlug = async (slug: string) => {
  const movie = await Movie.findOne({ slug: slug });

  if (!movie) {
    throw new Error("Not Found");
  }
  const result = movie.increaseViewCount(slug);

  return result;
};

const getTrendingMovies = async () => {
  const result = await Movie.find({ viewCount: { $gt: 15 } });
  return result;
};

const getNewReleaseMovies = async () => {
  // Calculate the date 7 days ago
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  // Query for movies released within the last 7 days
  const result = await Movie.find({
    releaseDate: {
      $gte: sevenDaysAgo,
      $lte: now,
    },
  });
  return result;
};

export const MovieServices = {
  createMovie,
  getAllMovies,
  getTrendingMovies,
  getMovieBySlug,
  getNewReleaseMovies,
};
