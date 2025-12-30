import express from "express";
import {
  getAllUsers,
  activateUser,
  deactivateUser
} from "../controllers/adminController.js";
import {
  authMiddleware,
  adminMiddleware
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.patch(
  "/users/:id/activate",
  authMiddleware,
  adminMiddleware,
  activateUser
);
router.patch(
  "/users/:id/deactivate",
  authMiddleware,
  adminMiddleware,
  deactivateUser
);

export default router;
