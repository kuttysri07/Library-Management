import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { userData, loading } = useContext(AuthContext);

  const name = userData?.name;
  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Name:{name}</div>;
};

export default Home;
