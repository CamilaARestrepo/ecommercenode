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


export function authorizeRole(requiredRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log('User info from token:', req.user); 
        const user = req.user;
        if (!user || !requiredRoles.includes(user.roleId)) {
            return res.status(403).json({ error: 'You do not have permission to perform this action' });
        }
        next();
    };
}

export function authorizeProfileAccess(request: Request, response: Response, next: NextFunction) {
    const userIdFromToken = request.user?.id;
    const userIdFromParams = request.params.id;

    if (!userIdFromToken || userIdFromToken !== userIdFromParams) {
        return response.status(403).json({
            ok: false,
            error: 'You do not have permission to access or modify this profile'
        });
    }
    next();
}

export function authorizeUserAccess(request: Request, response: Response, next: NextFunction) {
    const role = request.user?.roleId?.toLowerCase();
    const isAdmin = role === 'admin';
    const isUser = role === 'user';

    if (!isAdmin && !isUser) {
        return response.status(403).json({
            ok: false,
            message: 'You do not have permission to perform this action. Only admin or user roles are allowed.'
        });
    }

    next();
}

export function authorizePreorderConfirmation(request: Request, response: Response, next: NextFunction) {
    const userIdFromToken = request.user?.id;
    const userIdFromParams = request.params.userId;
    const preorderId = request.params.preorderId;

    if (!userIdFromToken) {
        return response.status(401).json({
            ok: false,
            message: 'User authentication required'
        });
    }

    if (!userIdFromParams) {
        return response.status(400).json({
            ok: false,
            message: 'User ID is required'
        });
    }

    if (!preorderId) {
        return response.status(400).json({
            ok: false,
            message: 'Preorder ID is required'
        });
    }

    const role = request.user?.roleId?.toLowerCase();
    const isAdmin = role === 'admin';
    const isUser = role === 'user';

    // Solo permitir si el rol es admin o user
    if (!isAdmin && !isUser) {
        return response.status(403).json({
            ok: false,
            message: 'You do not have permission to perform this action. Only admin or user roles are allowed.'
        });
    }

    // Permitir si es el mismo usuario o si es admin
    if (userIdFromToken !== userIdFromParams && !isAdmin) {
        return response.status(403).json({
            ok: false,
            message: 'You do not have permission to confirm preorders for this user'
        });
    }

    next();
}