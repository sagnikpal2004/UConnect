import {
    Request,
    Response
} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import pool from '../database/postgres';
const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response) => {
    const { username, email, password } =  req.body;
    const password_hash = await bcrypt.hash(password, 10);

    const result = await pool.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id", [username, email, password_hash]);
    
    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET);
    res.status(201).json({ token });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0)
        res.sendStatus(404);

    if (!await bcrypt.compare(password, result.rows[0].password_hash))
        res.sendStatus(401);

    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET);
    res.status(200).json({ token });
}