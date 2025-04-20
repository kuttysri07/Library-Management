import React, { useContext, useState } from "react";
import useBorrow from "../Hooks/useBorrow";
import { AuthContext } from "../context/AuthProvider";

const Modal = ({ image, bookId, borrowedBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const borrowBook = useBorrow();

  const { userData } = useContext(AuthContext);

  const userId = userData?._id;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!date) {
      alert("Please select a date!");
      return;
    }

    try {
      const result = await borrowBook(userId, bookId, date);
      console.log("Book borrowed successfully:", result);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to borrow book:", error.message);
    }
  };

  return (
    <div className="relative flex justify-center">
      <button
        disabled={borrowedBy !== null}
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 text-xs md:text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
      >
        Click to Pick
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
              <div>
                <img
                  className="object-contain w-full h-48 rounded-md"
                  src={image && image.includes("https") ? image : `/images/${image}`}
                  alt=""
                />

                <div className="mt-4 text-center">
                  <h3
                    className="font-medium leading-6 text-gray-800 capitalize dark:text-white"
                    id="modal-title"
                  >
                    Welcome to your dashboard
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <label className="text-sm text-gray-700 dark:text-gray-200">
                      Please Enter Return Date
                    </label>

                    <label className="block mt-3">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="How Long Do You Need?"
                        className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600   dark:focus:border-blue-300"
                      />
                    </label>

                    <div className="mt-5 sm:flex sm:items-center sm:-mx-2">
                      <button
                        onClick={handleClose}
                        className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Skip
                      </button>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                      >
                        pick up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-500 rounded-full"></button>
                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
                <button className="w-2 h-2 focus:outline-none mx-1.5 bg-blue-100 dark:bg-gray-700 rounded-full"></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
