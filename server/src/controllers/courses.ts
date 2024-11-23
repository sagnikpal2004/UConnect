import { Request, Response } from 'express';
import pool from '../database/postgres';

// Controller to get all class community
export const getCourses = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM courses");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

// Controller to create a new class community
export const createCourse = async (req: Request, res: Response) => {
    const { course_subject, course_name } = req.body;
    if (!course_subject) 
        return res.status(400).json({ message: 'course_subject is required' });
    if (!course_name)
        return res.status(400).json({ message: 'course_name is required' });

    try {
        const result = await pool.query(
            "INSERT INTO courses (course_subject, course_name) VALUES ($1, $2) RETURNING id",
            [course_subject, course_name]
        );
        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { course_subject, course_name } = req.body;
    if (!course_subject) 
        return res.status(400).json({ message: 'course_subject is required' });
    if (!course_name)
        return res.status(400).json({ message: 'course_name is required' });

    try {
        const result = await pool.query(
            'UPDATE courses SET course_subject = $1, course_name = $2 WHERE id = $3 RETURNING *',
            [course_subject, course_name, id]
        );

        if (result.rowCount === 0)
            return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM courses WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0)
            return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}