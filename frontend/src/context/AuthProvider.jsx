import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import APP_LINK from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${APP_LINK}/auth/user`, {
        withCredentials: true,
      });
      setUserData({...response.data.user});
      console.log(response.data.user);
    } catch (error) {
      setUserData(null);
      console.error("Auth check failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  
  
  return (
    <AuthContext.Provider value={{ userData, loading, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
