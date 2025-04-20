import jwt from "jsonwebtoken";
import { authMOdel } from "../schema/authSchema.js";

export const protectRoute = async (req, res, next) => {
  try {

    const token = req.cookies?.jwt; 

    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    let decode;
    try {
      decode = jwt.verify(token, process.env.SECRETKEY); 
    } catch (err) {
      return res.status(400).json({ message: "Unauthorized - Invalid Token" });
    }

    if (!decode?.userId) {
      return res.status(400).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await authMOdel.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "No user Found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(`Error in protectRoute Middleware: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
