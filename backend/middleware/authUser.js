import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (!decoded?.id) {
      return res.status(403).json({ success: false, message: "Not Authorized" });
    }

    req.userId = decoded.id;   // for quick access
    req.user = decoded;        // attach full decoded payload
    next();
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}