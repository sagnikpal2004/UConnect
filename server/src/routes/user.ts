import express from "express";
import {
    connectUserWithClass,
    getClassList,
    createNewClass,
    deleteClass
} from "../controllers/user";


const router = express.Router();

router.post("/connect", connectUserWithClass);
router.get("/classList", getClassList);
router.post("/newClass", createNewClass);
router.delete("/class", deleteClass);


export default router;