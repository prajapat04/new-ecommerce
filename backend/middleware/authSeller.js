import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies; // read cookie
  
  if (!sellerToken) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }


  try {
    // verify JWT
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if(decoded.email === process.env.SELLER_EMAIL){
      next();
    }else{
      return res.json({success: false, message: 'Not Authorized'});
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};



