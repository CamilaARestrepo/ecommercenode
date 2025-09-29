import { Request, Response, NextFunction } from 'express';

export const useParamValidation = (request: Request, response: Response, next: NextFunction) => {
    const { email, password, firstName, phone,birthDate } = request.body;

    if (!email) {
        return response.status(422).json({
            ok: false,
            error: 'The email field is required'
        });
    }

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
        return response.status(422).json({ 
            ok: false, 
            error: 'The email format is invalid' 
        });
    }

    if (!password) {
        return response.status(422).json({ 
            ok: false, 
            error: 'The password field is required' 
        });
    }

    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate || !birthDateRegex.test(birthDate)) {
        return response.status(422).json({
            ok: false,
            error: 'The birthDate field is required and must have format YYYY-MM-DD'
        });
    }
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth >= now) {
        return response.status(422).json({
            ok: false,
            error: 'The birth date must be a date in the past'
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return response.status(422).json({
            ok: false,
            error: 'The password must be at least 8 characters and include uppercase, lowercase, numbers, and symbols.'
        });
    }

    if (!firstName) {
        return response.status(422).json({ 
            ok: false, 
            error: 'The firstName field is required' 
        });
    }

    if (phone !== undefined && phone !== null && phone !== "") {
        const phoneStr = String(phone);
        const phoneRegex = /^3\d{9}$/;
        if (!phoneRegex.test(phoneStr)) {
            return response.status(422).json({
                ok: false,
                error: 'The phone must follow Colombian format (10 digits, starting with 3)'
            });
        }
    }

    next();
};