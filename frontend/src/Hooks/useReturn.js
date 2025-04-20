import axios from "axios";

import APP_LINK from "../../config";

const useReturn = () => {
  const returnBook = async(userId, bookId) => {
    try {
      const res = await axios.post(`${APP_LINK}/api/returnbook`, { userId, bookId });
      console.log(res.data);
    } catch (error) {
      console.error("Error from Return Book Hook", error.message);
    }
  };

  return returnBook;
};

export default useReturn;
