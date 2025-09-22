import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id){
      req.userId = decoded.id;
    }else{
      return res.json({success: false, message: 'Not Authrized'});
    }
    next();
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}