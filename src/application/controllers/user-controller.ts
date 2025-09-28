import { Request, Response } from 'express';
import { UserRequest } from '../dtos/user-request';

export const createUser = (request: Request, response: Response) => {
    try {
        const user: UserRequest = request.body;


        //esto va mientras pruebo validaciones
        response.status(201).json({
            ok: true,
            message: 'Usuario creado exitosamente',
            user
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error interno del servidor',
            error: (error as Error).message
        });
    }
}