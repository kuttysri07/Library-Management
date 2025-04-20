import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Image } from "antd";
const Profile = () => {
  const { userData } = useContext(AuthContext);

  console.log(userData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <Image
            className="rounded-full border-4 border-blue-500 shadow-md"
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&h=764&q=100"
            alt="Profile"
            width={100}
            height={100}
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {userData?.name}
          </h2>
          <p className="text-gray-600">{userData?.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Borrowed Books:
          </h3>
          {userData?.borrowedBooks.length > 0 ? (
            <div className="mt-4 space-y-4">
              {userData?.borrowedBooks.map(
                ({ title, dueDate, _id, borrowedAt }) => (
                  <div
                    key={_id.$oid}
                    className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                  >
                    <p className="text-gray-800">
                      <strong>Book :</strong> {title}
                    </p>

                    <p className="text-gray-600">
                      <strong>Borrowed At:</strong>{" "}
                      {new Date(borrowedAt).toDateString()}
                    </p>
                    <p className="text-gray-600">
                      <strong>Due Date:</strong>{" "}
                      {new Date(dueDate).toDateString()}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="mt-2 text-gray-500">No books borrowed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
