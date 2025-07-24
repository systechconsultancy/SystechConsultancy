import { jwtVerify } from "jose";
import AdminUser from "../models/AdminUser.js";

// Helper function to securely get the JWT secret key
function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in your .env file");
  }
  return new TextEncoder().encode(secret);
}

// 1. Authentication Middleware ('protect')
// Checks if a user is logged in and has a valid token.
export const protect = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    // Attach user data to the request object for later use
    req.user = await AdminUser.findById(payload.id).select("-password");
    next(); // Token is valid, proceed
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed." });
  }
};

// 2. Authorization Middleware ('authorize')
// Checks if the logged-in user has the required role.
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Forbidden: This action requires one of the following roles: ${roles.join(', ')}` });
    }
    next();
  };
};