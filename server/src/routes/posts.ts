import express from "express";
import {
    getPostById
} from "../controllers/posts";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.use(authenticateToken);

router.get("/:id", getPostById);

export default router;