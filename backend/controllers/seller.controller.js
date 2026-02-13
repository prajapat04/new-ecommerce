import jwt from "jsonwebtoken";

// POST /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For now, using env seller credentials
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const isProduction = process.env.NODE_ENV?.trim() === "production" || process.env.VERCEL === "1";

    // ✅ Set cookie properly for cross-origin (Vercel)
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({ success: true, message: "Logged Out" })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// GET /api/seller/is-auth
export const isAuthSeller = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message, success: false });
  }

};


