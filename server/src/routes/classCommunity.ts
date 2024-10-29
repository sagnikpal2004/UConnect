import express from "express";
import {
    getClassCommunity,
    createClassCommunity
} from "../controllers/classCommunity";

const router = express.Router();

router.get("/", getClassCommunity);
router.post("/create", createClassCommunity);

export default router;