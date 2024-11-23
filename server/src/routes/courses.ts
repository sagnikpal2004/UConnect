import express from "express";
import {
    createCourse,
    deleteCourse,
    getCourses,
    getCourseById,
    updateCourse,
} from "../controllers/courses";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/create", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;