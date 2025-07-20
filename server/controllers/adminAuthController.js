import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

const generateToken = (id, role,name) => {
  return jwt.sign({ id, role,name }, process.env.JWT_SECRET, {
    expiresIn: "45m",  
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role, user.name);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 45 * 60 * 1000, // 45 minutes
      })
      .json({
        ok: true,
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutAdmin = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
}

export {loginAdmin, logoutAdmin}