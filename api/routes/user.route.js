import express from "express";
import { updateProfileAndResume, signup, signin, signout } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/auth.js";

const router = express.Router();

// User Routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/profile/upload",verifyToken, updateProfileAndResume);

export default router;