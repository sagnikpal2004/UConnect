import { Request, Response } from 'express';
import pool from '../database/postgres';

export const getUserProfile = async (req: Request, res: Response) => {

    
    const userId = req.user.id;  // Assuming user ID is available in the request
    const result = await pool.query('SELECT name, email FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
        return res.sendStatus(404);
    }
    res.status(200).json(result.rows);  // Send the user's profile data
};

export const postUserProfile = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const userId = req.user.id;  // Make sure to get user ID from the request
    const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, userId]);

    if (result.rowCount === 0) {
        return res.sendStatus(404);
    }
    res.sendStatus(200);  // Indicate successful update
};