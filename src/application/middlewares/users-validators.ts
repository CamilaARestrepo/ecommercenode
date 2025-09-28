import { Request, Response, NextFunction } from 'express';

export const useParamValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email, password, firstName, phone,birthDate } = request.body;


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
    }    // ...en tu middleware de validación...
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate || !birthDateRegex.test(birthDate)) {
        return response.status(422).json({
            ok: false,
            error: 'El campo birthDate es obligatorio y debe tener formato YYYY-MM-DD'
        });
    }
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth >= now) {
        return response.status(422).json({
            ok: false,
            error: 'La fecha de nacimiento debe ser una fecha en el pasado'
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