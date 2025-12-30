import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// GET current logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;

