import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import pool from '../database/postgres';

const secretKey = process.env.JWT_SECRET!;

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) 
        return res.sendStatus(401);

    const token = authHeader && authHeader.split(' ')[1];
    try {
        const decoded_id = jwt.verify(token, secretKey) as JwtPayload;

        const user = (await pool.query("SELECT * FROM users WHERE id = $1", [decoded_id.id])).rows[0];
        req.body.user = user;
    } catch (error) {
        return res.status(403).send((error as Error).message);
    }
    
    next();
}

export default authenticateToken;