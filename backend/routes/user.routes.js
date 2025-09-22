import express from "express";
import { registerUser, loginUser, logoutUser, isAuthUser } from "../controllers/user.controllers.js";
import { authUser } from "../middleware/authUser.js"; // middleware to verify JWT

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/is-auth", authUser, isAuthUser);
router.get("/logout", authUser, logoutUser);

export default router;

