import { Request, Response } from 'express';

import { buildUserRequest, UserRequest, buildUserResponse } from '../dtos/user-dtos';
import {
    saveUser,
    findUserById,
    hashPassword,
    findAllUsers,
    updateUserById
} from '../../domain/services/user-services';


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
        console.error(error);
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}

export const updateUser = async (request: Request, response: Response) => {
    try {
        const userId: string = request.params.id;
        const existingUser = await findUserById(userRepo, userId);
        if (!existingUser) {
            return response.status(404).json({
                ok: false,
                message: 'User not found'
            });
        }
        const updatedData: UserRequest = buildUserRequest(request.body);

        const result = await updateUserById(userRepo, userId, updatedData);
        response.status(200).json({
            ok: true,
            message: 'User updated successfully',
            user: buildUserResponse(result)
        });

    } catch (error) {
    }
}

export const updatePartialUser = async (request: Request, response: Response) => {
    try {

        const userId: string = request.params.id;

        const existingUser = await findUserById(userRepo, userId);

        if (!existingUser) {
            return response.status(404).json({
                ok: false,
                message: 'User not found'
            });
        }

        const updatedData = request.body;

        const result = await updateUserById(userRepo, userId, updatedData);
        response.status(200).json({
            ok: true,
            message: 'User updated successfully',
            user: buildUserResponse(result)
        });

    } catch (error) {

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

    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}

export const getAllUsers = async (request: Request, response: Response) => {
    try {
        const users = await findAllUsers(userRepo);
        const userResponses = users.map(user => buildUserResponse(user));

        response.status(200).json({
            ok: true,
            users: userResponses
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
};

