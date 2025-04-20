import axios from "axios";
import React, { useState, useEffect } from "react";
import APP_LINK from "../../config";

const EditModal = ({
  bookId,
  image,
  title,
  author,
  language,
  link,
  year,
  pages,
}) => {
  const [open, setOpen] = useState(false);

  const [booktitle, setBookTitle] = useState(title);
  const [authorname, setAuthorName] = useState(author);
  const [languages, setLanguages] = useState(language);
  const [wikiLink, setWikiLink] = useState(link);
  const [years, setYears] = useState(year);
  const [totalPages, setTotalPages] = useState(pages);

  useEffect(() => {
    setBookTitle(title);
    setAuthorName(author);
    setLanguages(language);
    setWikiLink(link);
    setYears(year);
    setTotalPages(pages);
  }, [title, author, language, link, year, pages]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: booktitle,
        author: authorname,
        language: languages,
        link: wikiLink,
        year: years,
        pages: totalPages,
      };

      const response = await axios.put(
        `${APP_LINK}/api/updatebook/${bookId}`,
        updatedData
      );
      console.log("Book updated successfully:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Faild to update book:", error.message);
    }
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✖
            </button>

            <img
              className="w-full h-48 object-contain rounded-md"
              src={
                image && image.includes("https") ? image : `/images/${image}`
              }
              alt="Book Cover"
            />

            <div className="mt-4">
              <form onSubmit={handleSave}>
                <label className="block text-sm text-gray-500">
                  Author Name
                </label>
                <input
                  value={authorname}
                  onChange={(e) => setAuthorName(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <label className="block text-sm text-gray-500 mt-2">
                  Book Title
                </label>
                <input
                  value={booktitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <label className="block text-sm text-gray-500 mt-2">
                  Language
                </label>
                <input
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <label className="block text-sm text-gray-500 mt-2">Year</label>
                <input
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <label className="block text-sm text-gray-500 mt-2">
                  View More Link
                </label>
                <input
                  value={wikiLink}
                  onChange={(e) => setWikiLink(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <label className="block text-sm text-gray-500 mt-2">
                  Pages
                </label>
                <input
                  value={totalPages}
                  onChange={(e) => setTotalPages(e.target.value)}
                  type="text"
                  className="w-full p-2 border rounded-lg"
                />

                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-gray-700 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
