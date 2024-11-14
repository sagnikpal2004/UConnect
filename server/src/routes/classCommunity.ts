import express from "express";
import {
    getClassCommunity,
    getClassCommunityById,
    createClassCommunity
} from "../controllers/classCommunity";

const router = express.Router();

router.get("/", getClassCommunity);
router.get("/:id", getClassCommunityById);
router.post("/create", createClassCommunity);

export default router;

// Connect a class with a user
// GET userList
