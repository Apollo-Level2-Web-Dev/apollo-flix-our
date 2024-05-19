import dotenv from "dotenv";

dotenv.config();

export default {
  port: 3000,
  database_url: process.env.DATABASE_URL,
};
