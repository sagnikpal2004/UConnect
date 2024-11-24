import express from "express";
import {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    upvotePost,
    downvotePost,
    deletePost
} from "../controllers/posts";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.use(authenticateToken);


router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);

router.put("/:id", updatePost);
router.put("/:id/upvote", upvotePost);
router.put("/:id/downvote", downvotePost);

router.delete(":/id", deletePost);


export default router;