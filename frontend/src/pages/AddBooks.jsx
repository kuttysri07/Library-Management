import React, { useState } from "react";
import axios from "axios";
import APP_LINK from "../../config";

const AddBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    country: "",
    wiki: "",
    year: "",
    pages: "",
    language: "",
    imageLink: null,
  });

  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    setLoading(true)
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", "for_library"); // Replace with your Cloudinary preset
    imageFormData.append("cloud_name", "dq1mobhjs"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dq1mobhjs/image/upload", // Replace with your Cloudinary cloud name
        imageFormData
      );

      // Ensure that only the image field is updated
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageLink: response.data.secure_url,
      }));

      setLoading(false)

      console.log("Uploaded Image URL:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APP_LINK}/api/addbook`, formData);
      console.log("log from add book", response.data);

      // Reset the form after submission
      setFormData({
        title: "",
        author: "",
        country: "",
        wiki: "",
        year: "",
        pages: "",
        language: "",
        imageLink: null,
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Add a New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter book title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter author name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Wikipedia Link
          </label>
          <input
            type="url"
            name="wiki"
            value={formData.wiki}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Wikipedia link"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter publication year"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pages
          </label>
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter number of pages"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter language"
          />
        </div>
        {/* File Upload */}
        <div>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer  dark:border-gray-700 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-500 dark:text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            <h2 className="mt-1 font-medium tracking-wide text-black ">
              Upload File
            </h2>
            <p className="mt-2 text-xs tracking-wide text-black ">
              Upload or drag & drop your file (SVG, PNG, JPG, or GIF)
            </p>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <button
        disabled={loading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {loading ? "Uploading Please wait ..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
