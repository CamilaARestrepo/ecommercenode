import { Request, Response } from 'express';
import { buildUserRequest, UserRequest } from '../dtos/user-dtos';

export const createUser = (request: Request, response: Response) => {
    try {
       // const user: UserRequest = request.body;
        const newUser = buildUserRequest(request.body);


        //esto va mientras pruebo validaciones
        response.status(201).json({
            ok: true,
            message: 'Usuario creado exitosamente',
            user: newUser
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Error interno del servidor',
            error: (error as Error).message
        });
    }
}