import { Request, Response, NextFunction } from 'express';

export const useParamValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email, password, firstName, phone } = request.body;


    if (!email) {
        return response.status(422).json({
            ok: false,
            error: 'El campo email es obligatorio'
        });
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
        return response.status(422).json({ 
            ok: false, 
            error: 'El email no tiene un formato válido' 
        });
    }



    if (!password) {
        return response.status(422).json({ 
            ok: false, 
            error: 'El campo password es obligatorio' 
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return response.status(422).json({
            ok: false,
            error: 'El password debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos.'
        });
    }


    if (!firstName) {
        return response.status(422).json({ 
            ok: false, 
            error: 'El campo name es obligatorio' 
        });
    }


    if (phone !== undefined && phone !== null && phone !== "") {
        const phoneStr = String(phone);
        const phoneRegex = /^3\d{9}$/;
        if (!phoneRegex.test(phoneStr)) {
            return response.status(422).json({
                ok: false,
                error: 'El campo phone debe tener formato colombiano (10 dígitos, iniciar con 3)'
            });
        }
    }

    next();
};