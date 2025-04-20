import createToken from "../middlewares/jwt.js";
import { authMOdel } from "../schema/authSchema.js";
import bcrypt from "bcrypt";

export const signupContoller = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(500)
        .json({ success: false, message: "Signup fields Missing" });
    }

    const existingUser = await authMOdel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email was already registerd" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const signup = await authMOdel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup Successfully",
      name: signup.name,
      email: signup.email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error from loginController",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Login fields Missing" });
    }

    const User = await authMOdel.findOne({ email });

    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    createToken(User._id, res);

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      name: User.name,
      email: User.email,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Login Controller",
      error: error.message,
    });
  }
};

export const logoutController = (req, res) => {
  try {
    // Clear the token from cookies
    res.clearCookie("jwt", {
      httpOnly: true, // Prevents client-side JS from accessing it
      secure: process.env.NODE_ENV === "production", // Only for HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Logout Controller",
      error: error.message,
    });
  }
};

export const getloggedUSer = (req, res) => {
  try {
    const user = req.user;
    res.status(201).json({ success: true, message: "User Logged In", user });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "User is not availabe",
        error: error.message,
      });
  }
};
