import express from "express";
import cors from "cors";
import { connectDb } from "./utlis/db.js";
import bookRoutes from "./routes/bookRoute.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cronjob from "./Mailer/cronjob.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173" || process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

const Port = process.env.PORT;

connectDb();

app.use("/api", bookRoutes);
app.use("/auth", authRoutes);

app.listen(`${Port}`, () => {
  console.log(`Server is running on Port ${Port}`);
});
