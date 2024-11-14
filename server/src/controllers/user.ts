import { Request, Response } from 'express';
import pool from '../database/postgres';
export const connectUserWithClass = async (req: Request, res: Response) => {
    const { userId, courseId } = req.body;
    try {
        await pool.query(
            "UPDATE users SET course_list = array_append(course_list, $1) WHERE id = $2",
            [courseId, userId]
        );
        await pool.query(
            "UPDATE courses SET users = array_append(users, $1) WHERE id = $2",
            [userId, courseId]
        );
        res.status(200).json({ message: "User connected to the class successfully" });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
export const getClassList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const result = await pool.query(
            "SELECT course_list FROM users WHERE id = $1",
            [userId]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result.rows[0].course_list);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
export const createNewClass = async (req: Request, res: Response) => {
    const { course_subject, course_name, userId } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO courses (course_subject, course_name, users) VALUES ($1, $2, ARRAY[$3]) RETURNING id",
            [course_subject, course_name, userId]
        );
        await pool.query(
            "UPDATE users SET course_list = array_append(course_list, $1) WHERE id = $2",
            [result.rows[0].id, userId]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
export const deleteClass = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
        await pool.query(
            "DELETE FROM courses WHERE id = $1",
            [courseId]
        );
        await pool.query(
            "UPDATE users SET course_list = array_remove(course_list, $1)",
            [courseId]
        );
        res.status(200).json({ message: "Class deleted successfully" });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
