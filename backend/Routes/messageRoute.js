import { Router } from "express";
import { getAllMessages } from "../Controllers/messageController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = Router()

router.post("/getAllMessages", authMiddleware, getAllMessages)

export default router