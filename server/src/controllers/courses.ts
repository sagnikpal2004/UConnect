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
    const { autojoin } = req.query;
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

        if (autojoin == "true") {
            await pool.query(
                "UPDATE courses SET users = array_append(users, $1) WHERE id = $2", 
                [req.body.user.id, result.rows[0].id]
            );
            await pool.query(
                "UPDATE users SET course_list = array_append(course_list, $1) WHERE id = $2",
                [result.rows[0].id, req.body.user.id]
            );
        }

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
            return res.sendStatus(404);

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
            return res.sendStatus(404);
        await pool.query('UPDATE users SET course_list = array_remove(course_list, $1)', [id]);

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const joinCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.sendStatus(404);
        if (result.rows[0].users.includes(req.body.user.id))
            return res.status(400).json({ message: 'User already joined the class' });

        await pool.query(
            "UPDATE courses SET users = array_append(users, $1) WHERE id = $2", 
            [req.body.user.id, id]
        );
        await pool.query(
            "UPDATE users SET course_list = array_append(course_list, $1) WHERE id = $2",
            [id, req.body.user.id]
        );
        res.status(200).json({ message: 'User joined course successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const leaveCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.sendStatus(404);
        if (!result.rows[0].users.includes(req.body.user.id))
            return res.status(400).json({ message: 'User not in the class' });

        await pool.query(
            "UPDATE courses SET users = array_remove(users, $1) WHERE id = $2",
            [req.body.user.id, id]
        );
        await pool.query(
            "UPDATE users SET course_list = array_remove(course_list, $1) WHERE id = $2",
            [id, req.body.user.id]
        );
        res.status(200).json({ message: 'User left course successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}