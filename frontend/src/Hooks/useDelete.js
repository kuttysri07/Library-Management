import axios from "axios";
import APP_LINK from "../../config";

const useDelete = () => {
  const deleteHandeler = async (bookId) => {
    try {
      const res = await axios.delete(`${APP_LINK}/api/deletebook/${bookId}`);
      console.log("Book deleted SuccessFully", res.data);
    } catch (error) {
      console.log("Error from Delete Hook :", error.message);
    }
  };

  return deleteHandeler;
};

export default useDelete;
