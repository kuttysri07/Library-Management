import axios from "axios";
import  { useContext } from "react";
import APP_LINK from "../../config";
import { AuthContext } from "../context/AuthProvider";



const useLogout = () => {
  const { setUserData } = useContext(AuthContext);

  const logoutHandeler = async () => {
    try {
      const response = await axios.post(`${APP_LINK}/auth/logout` , {} ,{withCredentials:true});
      setUserData(null);
      console.log("Logout handeler :",response.data);
    } catch (error) {
      console.log("Error in UseLogout Custom Hook : ", error.message);
    }
  };

  return logoutHandeler;
};

export default useLogout;
