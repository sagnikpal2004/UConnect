import { Request, Response } from 'express';
import pool from '../database/postgres';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM posts");
        res.status(200).json(result.rows);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const createPost = async (req: Request, res: Response) => {
    const { content, course_id, parentpost_id } = req.body;
    if (!content) 
        return res.status(400).json({ message: 'content is required' });
    if (!course_id)
        return res.status(400).json({ message: 'course_id is required' });

    try {
        const result0 = await pool.query("SELECT * FROM courses WHERE id = $1", [course_id]);
        if (result0.rowCount == 0)
            return res.status(400).json({ message: 'course_id does not exist' });

        if (parentpost_id) {
            const result1 = await pool.query("SELECT * FROM posts WHERE id = $1", [parentpost_id]);
            if (result1.rowCount == 0)
                return res.status(400).json({ message: 'parentpost_id does not exist' });
        }

        const result = await pool.query(
            "INSERT INTO posts (sender_id, content, course_id, parentpost_id) VALUES ($1, $2, $3, $4) RETURNING id",
            [req.body.user.id, content, course_id, parentpost_id ?? 0]
        )
        res.status(201).json({id: result.rows[0].id});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) 
        return res.status(400).json({ message: 'content is required' });

    try {
        const result = await pool.query(
            'UPDATE posts SET content = $1 WHERE id = $2 RETURNING *',
            [content, id]
        );

        if (result.rowCount === 0)
            return res.sendStatus(404);

        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const upvotePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE posts SET votes = votes + 1 WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0)
            return res.sendStatus(404);

        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const downvotePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE posts SET votes = votes - 1 WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0)
            return res.sendStatus(404);

        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0)
            return res.sendStatus(404);
        res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}