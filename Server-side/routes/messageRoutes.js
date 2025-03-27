import express from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
  getUnreadCount,
} from "../controllers/messageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, upload.array("attachments", 5), createMessage)
  .get(authenticateToken, getMessages);

router.route("/unread/count").get(authenticateToken, getUnreadCount);

router
  .route("/:id")
  .get(authenticateToken, getMessageById)
  .put(authenticateToken, updateMessage)
  .delete(authenticateToken, deleteMessage);

export default router;
