import { Router } from "express";
import { multerUploadFile } from "../Middlewares/multerMiddleware.js";
import { SearchCommunity, addAdminToCommunity, addCommunity, addUserToCommunity, deleteCommunity, getMyCommunity, getThisCommunity, getTrendingCommunity, removeUserFromCommunity } from "../Controllers/communityController.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = Router();

router.post("/addCommunity",authMiddleware, multerUploadFile, addCommunity);
router.post("/trendingCommunities", getTrendingCommunity)
router.post("/getJoinedCommunity",authMiddleware, getMyCommunity)
router.post("/getThisCommunity",authMiddleware,getThisCommunity)
router.post("/addUserToCommunity", authMiddleware, addUserToCommunity)
router.post("/searchCommunity", SearchCommunity)
router.post("/deleteCommunity",authMiddleware, deleteCommunity)
router.post("/removeUser", authMiddleware, removeUserFromCommunity)
router.post("/makeAdmin", authMiddleware, addAdminToCommunity)

export default router