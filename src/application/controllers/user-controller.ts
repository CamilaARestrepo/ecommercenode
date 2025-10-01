import { Request, Response } from 'express';

import { buildUserRequest, UserRequest, buildUserResponse } from '../dtos/user-dtos';
import { saveUser,findUserById, hashPassword } from '../../domain/services/user-services';


import { MongoUserRepository } from '../../infraestructure/repositories/mongo-user';

const userRepo = new MongoUserRepository();

export const createUser = async (request: Request, response: Response) => {
    try {

        const newUser = buildUserRequest(request.body);
        
        newUser.password = await hashPassword(newUser.password);

        const result = await saveUser(userRepo, newUser);

        response.status(201).json({
            ok: true,
            message: 'User created successfully',
            user: buildUserResponse(result)
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}

export const getUserProfile = async (request: Request, response: Response) => {
    try {
        const userId: string = request.params.id;
        const user = await findUserById(userRepo, userId);
        if (!user) {
            return response.status(404).json({
                ok: false,
                message: 'User not found'
            });
        }
        response.status(200).json({
            ok: true,
            user: buildUserResponse(user)
        });
        
    }catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}
