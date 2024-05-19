import { format } from "date-fns";
import { Schema, model } from "mongoose";
import slugify from "slugify";
import { TMovie, TMovieMethods, TMovieModel, TReview } from "./movie.interface";

const reviewSchema = new Schema<TReview>({
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const movieSchema = new Schema<TMovie, TMovieModel, TMovieMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    releaseDate: {
      type: Date,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    reviews: {
      type: [reviewSchema],
    },
    slug: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

movieSchema.pre("save", async function (next) {
  const date = format(this.releaseDate, "dd-MM-yyyy");
  console.log(slugify(`${this.title} ${date}`));
  this.slug = slugify(`${this.title} ${date}`, {
    lower: true,
  });
  next();
});

movieSchema.post("save", async function (doc, next) {
  console.log("Data is saved");
  next();
});

movieSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

movieSchema.methods.increaseViewCount = async function (slug: string) {
  const result = await Movie.findOneAndUpdate(
    { slug },
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  return result;
};

movieSchema.virtual("avgRating").get(function () {
  if (Number(this.reviews.length) === 0) return 0;

  const totalRating = this.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return totalRating / this.reviews.length;
});

export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
