import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

const createMovie = async (movieData: TMovie) => {
  const result = await Movie.create(movieData);
  return result;
};

const getAllMovies = async () => {
  const result = await Movie.find();
  return result;
};

const getSingleMovie = async (id: string) => {
  const movie = await Movie.findOne({ _id: id });
  return movie;
};


export const MovieServices = {
  createMovieIntoDB: createMovie,
  getAllMoviesFromDB: getAllMovies,
  getSingleMovieFromDB: getSingleMovie,

};









// const { searchTerm } = query;

// let filter = {};

// if (searchTerm) {
//   const regex = new RegExp(searchTerm as string, "i"); // 'i' makes it case-insensitive
//   filter = {
//     $or: [
//       { title: regex },
//       { description: regex },
//       { genre: regex },
//       // Add more fields if necessary
//     ],
//   };
// }


// const getTrendingMovies = async () => {
//   const result = await Movie.find({ viewCount: { $gt: 15 } });
//   return result;
// };

// const getNewReleaseMovies = async () => {
//   // Calculate the date 7 days ago
//   const now = new Date();
//   const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
//   // Query for movies released within the last 7 days
//   const result = await Movie.find({
//     releaseDate: {
//       $gte: sevenDaysAgo,
//       $lte: now,
//     },
//   });
//   return result;
// };
