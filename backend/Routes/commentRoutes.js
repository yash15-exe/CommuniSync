import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../Controllers/commentsController.js";

const router = Router();

router.post("/addComment", addComment);
router.post("/deleteComment", deleteComment);
router.post("/getComments", getComments);

export default router;
