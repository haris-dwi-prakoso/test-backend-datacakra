import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const dotenv = (require("dotenv").config()).parsed;

export const SECRET_KEY: Secret = dotenv.SECRET_KEY;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;
        console.log('decoded:', decoded);

        next();
    } catch (err) {
        res.status(401).send('Authentication needed');
    }
};