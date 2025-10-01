import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../domain/services/auth-services';
import { buildErrorResponse } from '../dtos/auth-dtos';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json(
            buildErrorResponse('Unauthorized', 'Access token is required')
        );
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json(
            buildErrorResponse('Forbidden', 'Invalid or expired token')
        );
    }
};