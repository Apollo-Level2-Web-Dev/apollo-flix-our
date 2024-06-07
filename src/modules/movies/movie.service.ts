import QueryBuilder from "../../builder/QueryBuilder";
import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

import { moviesSearchableFields } from "./movies.constants";

const createMovie = async (movieData: TMovie) => {
  const result = await Movie.create(movieData);
  return result;
};

const getAllMovies = async (payload: Record<string, unknown>) => {
  // let searchTerm = "";
  // if (payload?.searchTerm) {
  //   searchTerm = payload.searchTerm as string;
  // }
  // // srachable of fileds= titles, genre
  // const searchableFields = ["title", "genre"];

  // const searchedMovies = Movie.find({
  //   $or: searchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // // paginating
  // const limit = Number(payload?.limit || 10);
  // let skip: number = 0;

  // if (payload?.page) {
  //   const page: number = Number(payload?.page || 1);

  //   skip = Number((page - 1) * limit);
  // }
  // const paginateQuery = searchedMovies.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // sorting
  // let sortBy = "releaseDate";

  // if (payload?.sortBy) {
  //   sortBy = payload.sortBy as string;
  // }

  // const sortQuery = limitQuery.sort(sortBy);
  // // field filtering
  // const fields = (payload?.fields as string)?.split(",")?.join(" ") || "-__v";

  // const fieldSelectionQuery = sortQuery.select(fields);

  // // filtering
  // const queryObj = { ...payload };

  // const excluseFields = [
  //   "page",
  //   "limit",
  //   "sortBy",
  //   "minRating",
  //   "maxRating",
  //   "fields",
  //   "searchTerm",
  // ];
  // excluseFields.forEach((e) => delete queryObj[e]);

  const movieQuery = new QueryBuilder(Movie.find(), payload)
    .search(moviesSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await movieQuery.modelQuery;

  return result;
};

const getMovieBySlug = async (slug: string) => {
  const movie = await Movie.findOne({ slug: slug });

  if (!movie) {
    throw new Error("Not Found");
  }
  // const result = movie.increaseViewCount(slug);

  return movie;
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
