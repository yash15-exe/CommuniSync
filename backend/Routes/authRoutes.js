import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/userAuthController.js";

const router = Router();


router.post("/user/login", loginUser)
router.post("/user/register", registerUser)


export default router;

