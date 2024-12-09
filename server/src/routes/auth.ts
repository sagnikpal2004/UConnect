import express from "express";
import {
    getUserProfile,
    register, 
    login 
} from "../controllers/auth";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.get("/", authenticateToken, getUserProfile);
router.post("/register", register);
router.post("/login", login);

export default router;