import axios from "axios";
import APP_LINK from "../../config";

const useBorrow = () => {
  const borrowBook = async (userId, bookId, date) => {

    try {
        const response = await axios.post(`${APP_LINK}/api/borrowbook`, {
          userId,
          bookId,
          date, // Ensure this is a valid date string (e.g., "2024-03-30")
        });
        console.log("date :", date);
        return response.data; // Return response to the caller

     
    } catch (error) {
      console.error(
        "Error from useBorrow Hook:",
        error.response?.data || error.message
      );
      throw error; // Propagate the error so the caller can handle it
    }
  };

  return borrowBook;
};

export default useBorrow;
