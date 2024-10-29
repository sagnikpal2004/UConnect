import { Request, Response } from 'express';
import pool from '../database/postgres';

// Controller to get all class community names
export const getClassCommunity = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT course_subject FROM courses");
        const classCommunities = result.rows.map(row => row.course_subject);
        res.status(200).json(classCommunities);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

// Controller to create a new class community
export const createClassCommunity = async (req: Request, res: Response) => {
    const { course_subject, course_number, users } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO courses (course_subject, course_number, users) VALUES ($1, $2, $3) RETURNING id",
            [course_subject, course_number, users]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};