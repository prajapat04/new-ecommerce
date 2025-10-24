import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    // Attach user info to request
    req.userId = decoded.id;
    req.user = decoded;

    next();
  } catch (error) {
    console.error("authUser Error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized or expired token" });
  }
};
