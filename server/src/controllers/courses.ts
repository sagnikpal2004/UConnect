import { Request, Response } from 'express';
import pool from '../database/postgres';

// Controller to get all class community names
export const getCourses = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM courses");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// Controller to create a new class community
export const createCourse = async (req: Request, res: Response) => {
    const { course_subject, course_name, users } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO courses (course_subject, course_name, users) VALUES ($1, $2, $3) RETURNING id",
            [course_subject, course_name, users]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    res.sendStatus(501);
}

export const deleteCourse = async (req: Request, res: Response) => {
    res.sendStatus(501);
}