import express from "express";


import { authSeller } from "../middleware/authSeller.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/order.controller.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();
router.post('/cod', authUser, placeOrderCOD);
router.get('/user', authUser, getUserOrders);
router.get('/seller', authSeller, getAllOrders);
router.post('/stripe', authUser, placeOrderStripe);

export default router;
