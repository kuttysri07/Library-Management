import { authMOdel } from "../schema/authSchema.js";
import { bookModel } from "../schema/bookSchema.js";

export const addBooks = async (req, res) => {
  try {
    const formData = req.body;

    const addedBookData = await bookModel.create(formData);
    res.status(200).json({
      success: true,
      message: "Book added successfully",
      addedBookData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in AddBook Controller",
      error: error.message,
    });
  }
};

export const fetchAllBooks = async (req, res) => {
  try {
    const { title, author, page , limit  } = req.query;

    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const totalBooks = await bookModel.countDocuments(query); // Total books count
    const fetchedData = await bookModel.find(query).skip(skip).limit(limitNumber).lean();

    if (fetchedData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found matching the search criteria",
      });
    }

    res.status(200).json({
      success: true,
      message: title || author ? "Filtered Successfully" : "All The Books Fetched Successfully",
      currentPage: pageNumber,
      totalPages: Math.ceil(totalBooks / limitNumber),
      totalBooks,
      fetchedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in FetchAllBooks Controller",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book Deleted Successfully",
      deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error In deleteBook Controller",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {


  const bookId  = req.params.id;
  const updatedData = req.body;
  
  
  if (!bookId) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }

  try {
    const updatedBook = await bookModel.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book Updated Successfully",
      updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error In updateBook Controller",
      error: error.message,
    });
  }
};

export const borrowBook = async (req, res) => {
  try {
    const { userId, bookId, date } = req.body; // User provides the due date

    // Check if book exists and is available
    const book = await bookModel.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ success: false, message: "Book not available" });
    }

    // Validate the provided due date
    const dueDate = new Date(date);
    
    
    if (isNaN(dueDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid due date" });
    }

    // Update book: Set availability to false and assign user
    book.available = false;
    book.borrowedBy = userId;
    book.dueDate = dueDate;
    await book.save();

    // Update user: Add borrowed book to user record
    const user = await authMOdel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.borrowedBooks.push({ book: bookId, dueDate ,title:book.title ,imageLink:book.imageLink });
    await user.save();

    res.status(200).json({ success: true, message: "Book borrowed successfully", dueDate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in borrowing book", error: error.message });
  }
};


export const returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check if book exists
    const book = await bookModel.findById(bookId);
    if (!book || book.available) {
      return res.status(400).json({ success: false, message: "Book is not borrowed" });
    }

    // Update book: Set availability to true and remove user
    book.available = true;
    book.borrowedBy = null;
    book.dueDate = null;
    await book.save();

    // Update user: Remove book from borrowed list
    await authMOdel.findByIdAndUpdate(userId, {
      $pull: { borrowedBooks: { book: bookId } },
    });

    res.status(200).json({ success: true, message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in returning book", error: error.message });
  }
};

