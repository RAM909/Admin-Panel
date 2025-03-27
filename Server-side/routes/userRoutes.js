import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticateToken, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(authenticateToken, admin, getUsers);

router
  .route("/:id")
  .get(authenticateToken, admin, getUserById)
  .put(authenticateToken, admin, updateUser)
  .delete(authenticateToken, admin, deleteUser);

router.post("/login", authUser);

export default router;
