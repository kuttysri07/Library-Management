import express from "express";
import {
  addBooks,
  borrowBook,
  deleteBook,
  fetchAllBooks,
  returnBook,
  updateBook,
} from "../controller/bookController.js";

const router = express.Router();

router.post("/addbook", addBooks);
router.get("/getbooks", fetchAllBooks);
router.delete("/deletebook/:id", deleteBook);
router.put("/updatebook/:id", updateBook);
router.post("/borrowbook", borrowBook);
router.post("/returnbook", returnBook);

export default router;
