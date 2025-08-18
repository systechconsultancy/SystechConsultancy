import { jwtVerify } from "jose";
import User from "../models/User.js";

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in your .env file");
  }
  return new TextEncoder().encode(secret);
}

// Middleware to protect user routes
export const protectUser = async (req, res, next) => {

  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    req.user = await User.findById(payload.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};