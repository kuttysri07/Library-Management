import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  borrowedBooks: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
      imageLink:{type:String , ref:"Books"},
      borrowedAt: { type: Date, default: Date.now },
      dueDate: Date,
      title: { type: String, ref: "Books" },
    },
  ],
});

export const authMOdel = mongoose.model("Authentication", authSchema);
