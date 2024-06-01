export type TMovie = {
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  slug: string;
  viewCount: number;
  isDeleted?: boolean;
};











// Create a new Model type that knows about IUserMethods...
// export type TMovieModel = Model<TMovie, {}>;


import { Model } from "mongoose";
// 


// export type TMovieMethods = {
//   increaseViewCount(slug: string): void;
// };



// export type TReview = {
//   email: string;
//   rating: number;
//   comment: string;
// };