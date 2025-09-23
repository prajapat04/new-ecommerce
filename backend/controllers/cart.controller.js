import User from "../models/user.model.js";

// update user cartData: /api/cart/update

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(userId, {cartItems});
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
