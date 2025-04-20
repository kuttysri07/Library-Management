import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";
import EditModal from "./EditModal";
import useDelete from "../Hooks/useDelete";
import { Image } from "antd";
import useReturn from "../Hooks/useReturn";

const Card = ({
  bookId,
  title,
  author,
  language,
  link,
  year,
  pages,
  image,
  borrowedBy,
}) => {
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  const deleteHandeler = useDelete();
  const returnBook = useReturn();
   return (
    <div className="flex flex-col md:flex-row max-w-lg w-full  bg-white rounded-lg shadow-lg dark:bg-gray-800 overflow-hidden">
      <div className="w-full md:w-1/3 bg-cover">
        <Image
          className="w-full h-full object-cover"
          src={image && image.includes("https") ? image : `/images/${image}`}
          alt={title}
        />
      </div>

      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Author: {author}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {language} Language
          </p>
          <a className="mt-1 text-sm text-blue-500 hover:underline" href={link}>
            View More
          </a>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Year: {year}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pages: {pages}
          </p>
        </div>

        <div className="flex mt-2 space-x-1">
          {[...Array(3)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
          {[...Array(2)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-gray-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
        </div>

        {location.pathname === "/editbook" && (
          <div className="flex justify-between mt-3 items-center">
            <EditModal
              bookId={bookId}
              image={image}
              title={title}
              author={author}
              language={language}
              link={link}
              year={year}
              pages={pages}
            />
            <button
              onClick={() => deleteHandeler(bookId)}
              className="px-3 py-1 text-xs md:text-sm font-bold text-red-500 uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
            >
              Delete
            </button>
          </div>
        )}

        {location.pathname !== "/editbook" && (
          <div className="flex justify-between mt-3 items-center">
            <Modal bookId={bookId} image={image} borrowedBy={borrowedBy} />

            {userData ? (
              borrowedBy === null ? (
                <button className="px-3 py-1 text-xs md:text-sm font-bold text-green-300 uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none">
                  Available
                </button>
              ) : (
                <div>
                  <button className="px-3 py-1 text-xs md:text-sm font-bold text-red-500 capitalize transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none">
                    {userData._id === borrowedBy
                      ? "You Borrowed"
                      : "Not Available"}
                  </button>

                  <button onClick={()=> returnBook(userData?._id , bookId)} className="px-3 py-1 text-xs md:text-sm font-bold text-yellow-500 capitalize transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none">
                    {userData?.borrowedBooks.some(
                      (book) => book.book === bookId
                    )
                      ? "Return Book"
                      : null}
                  </button>
                </div>
              )
            ) : (
              <a
                className="px-3 py-1 text-xs md:text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
                href="/login"
              >
                Login to Borrow
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
