import { Request, Response } from 'express';
import { buildLoginRequest, buildAuthResponse, buildErrorResponse } from '../dtos/auth-dtos';
import { loginUser } from '../../domain/services/auth-services';
import { MongoUserRepository } from '../../infraestructure/repositories/mongo-user';
import { findUserById } from '../../domain/services/user-services';
import { MongoLoginRepository } from '../../infraestructure/repositories/mongo-login';

const userRepo = new MongoUserRepository();
const loginRepo = new MongoLoginRepository();

export const login = async (request: Request, response: Response) => {
    try {
        const loginData = buildLoginRequest(request.body);

        const result = await loginUser(userRepo, loginData);

        if (!result.success) {
            return response.status(401).json(
                buildErrorResponse('Unauthorized', result.message)
            );
        }

        response.status(200).json(
            buildAuthResponse('Token generated', result.token)
        );
    } catch (error) {
        return response.status(503).json(
            buildErrorResponse('ServiceUnavailable', 'Service unavailable')
        );
    }
};

export const getLogin = async (request: Request, response: Response) => {
    try {

        const userId = request.user?.id;
        
        if (!userId) {
            return response.status(401).json(
                buildErrorResponse('Unauthorized', 'User not authenticated')
            );
        }

        response.status(200).json({
            ok: true,
            message: 'Profile retrieved successfully',
            user: request.user
        });
    } catch (error) {
        return response.status(500).json(
            buildErrorResponse('InternalServerError', 'Internal server error')
        );
    }
};

export const logout = async (request: Request, response: Response) => {
    try {
        const userId = request.user?.id;
        if (!userId) {
            return response.status(401).json(
                buildErrorResponse('Unauthorized', 'User not authenticated')
            );
        }

        const existingUser = await findUserById(userRepo, userId);
        if (!existingUser) {
            return response.status(404).json(
                buildErrorResponse('NotFound', 'User not found')
            );
        }

        const idNumber = existingUser.idNumber;
        try {
            await loginRepo.resetRetries(idNumber);
        } catch (err) {
        }

        return response.status(200).json({ ok: true, message: 'Logged out successfully' });
    } catch (error) {
        return response.status(500).json(
            buildErrorResponse('InternalServerError', 'Internal server error')
        );
    }
};