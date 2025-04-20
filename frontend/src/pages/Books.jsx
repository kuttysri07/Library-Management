import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Search from "../components/Search";

const APP_LINK = import.meta.env.VITE_APP_API;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (title = "", author = "", page = currentPage, limit = 9) => {
    try {
      const response = await axios.get(`${APP_LINK}/api/getbooks`, {
        params: { title, author, page, limit },
      });

      setBooks(response.data.fetchedData);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error in FetchBooks:", error.message);
    }
  };

  useEffect(() => {
    fetchBooks("", "", currentPage);
  }, [currentPage]);

  return (
    <div>
      <Search fetchBooks={fetchBooks} />

      {/* Books Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="mt-10">
              <Card
                bookId={book._id}
                title={book.title}
                author={book.author}
                language={book.language}
                link={book.link}
                year={book.year}
                pages={book.pages}
                image={book.imageLink}
                borrowedBy={book.borrowedBy}
              />
            </div>
          ))
        ) : (
          <p>Loading Books, Please Wait...</p>
        )}

        {books.length === 0 && <h1>No Books</h1>}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-5">
  {/* Previous Button */}
  <button
    className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {/* Page Numbers */}
  <div className="flex flex-wrap justify-center gap-1">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`px-4 py-2 rounded-md transition-all duration-200 ${
          currentPage === index + 1
            ? "bg-blue-700 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-500 hover:text-white"
        }`}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>

  {/* Next Button */}
  <button
    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Books;
