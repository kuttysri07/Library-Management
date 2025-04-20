import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import AddBooks from "./pages/AddBooks.jsx";
import EditBooks from "./pages/EditBooks.jsx";
import Profile from "./pages/Profile.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addbook" element={<AddBooks />} />
            <Route path="/editbook" element={<EditBooks />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
