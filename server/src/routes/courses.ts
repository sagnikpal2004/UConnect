import express from "express";
import {
    createCourse,
    deleteCourse,
    getCourses,
    getCourseById,
    updateCourse,
    joinCourse,
    leaveCourse
} from "../controllers/courses";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

router.post("/:id/join", joinCourse);
router.post("/:id/leave", leaveCourse);

export default router;