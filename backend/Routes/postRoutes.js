import { Router } from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import { addPost, getPostsOfThisCommunity, likePost } from "../Controllers/postController.js";
import { multerUploadFile } from "../Middlewares/multerMiddleware.js";

const router = Router()

router.post("/getPostsOfThisCommunity",authMiddleware,getPostsOfThisCommunity)
router.post("/addPost",multerUploadFile, addPost)
router.post("/likePost",authMiddleware, likePost)
export default router