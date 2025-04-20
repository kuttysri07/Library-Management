import React, { useState } from "react";

const Search = ({ fetchBooks }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(title, name);
    setName("");
    setTitle("");
  };

  return (
    <div className="flex justify-center my-4 px-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Book Title"
          className="w-full sm:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Author Name"
          className="w-full sm:w-auto px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
