import jwt from "jsonwebtoken";

const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRETKEY, {
    expiresIn: "7d",
  });

  // Set the JWT token in a secure HTTP-only cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    sameSite: "None", // Prevent CSRF attacks
    secure:"production"
  });

  console.log("Cookie set successfully");

  return token; // Return the token (optional, if needed elsewhere)
};

export default createToken;
