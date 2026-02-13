import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const isProduction =
  process.env.NODE_ENV?.trim() === "production" || process.env.VERCEL === "1";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // Use secure only in production/Vercel
  sameSite: isProduction ? "none" : "lax", // 'none' for cross-domain, 'lax' for same-site (dev)
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// ----------------- REGISTER -----------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      message: "Registered successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Register Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------- LOGIN -----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, cookieOptions);

    return res.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------- IS AUTH -----------------
export const isAuthUser = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ success: false, message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, user });
  } catch (error) {
    console.log("isAuth Error:", error.message);
    return res.json({ success: false, message: "Token expired or invalid" });
  }
};

// ----------------- LOGOUT -----------------
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log("Logout Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};
