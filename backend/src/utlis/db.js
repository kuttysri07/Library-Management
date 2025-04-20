import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/Library")
    .then(() => console.log("Database connected successfully")) // Ensure it's a function call
    .catch((err) => console.log(`Connection error: ${err.message}`)); // Define 'err' parameter
};
