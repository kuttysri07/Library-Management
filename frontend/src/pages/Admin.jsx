import React from "react";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Panel</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a href="/addbook" className="px-6 py-3 text-center text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Add Books
          </a>
          <a href="/editbook" className="px-6 py-3 text-center text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
            Edit Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;