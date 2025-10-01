import { Request, Response, NextFunction } from 'express';

export const useParamValidation = (request: Request, response: Response, next: NextFunction) => {
    const {
        email,
        password,
        firstName,
        lastName,
        idType,
        idNumber,
        phone,
        roleId,
        gender,
        birthDate,
        status,
        country,
        state,
        city,
        neighborhood,
        address,
        postalCode
    } = request.body;

    // email
    if (!email) return response.status(422).json({ ok: false, error: 'The email field is required' });
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) return response.status(422).json({ ok: false, error: 'The email format is invalid' });

    // password
    if (!password) return response.status(422).json({ ok: false, error: 'The password field is required' });
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) return response.status(422).json({ ok: false, error: 'The password must be at least 8 characters and include uppercase, lowercase, numbers, and symbols.' });

    // names
    if (!firstName) return response.status(422).json({ ok: false, error: 'The firstName field is required' });
    if (!lastName) return response.status(422).json({ ok: false, error: 'The lastName field is required' });

    // id type/number
    if (!idType) return response.status(422).json({ ok: false, error: 'The idType field is required' });
    if (!idNumber) return response.status(422).json({ ok: false, error: 'The idNumber field is required' });

    // gender
    if (!gender) return response.status(422).json({ ok: false, error: 'The gender field is required' });

    // birthDate
    const birthDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate || !birthDateRegex.test(birthDate)) return response.status(422).json({ ok: false, error: 'The birthDate field is required and must have format YYYY-MM-DD' });
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth >= now) return response.status(422).json({ ok: false, error: 'The birth date must be a date in the past' });

    // phone
    if (!phone) return response.status(422).json({ ok: false, error: 'The phone field is required' });
    const phoneStr = String(phone);
    const phoneRegex = /^3\d{9}$/;
    if (!phoneRegex.test(phoneStr)) return response.status(422).json({ ok: false, error: 'The phone must follow Colombian format (10 digits, starting with 3)' });

    // roleId & status
    if (!roleId) return response.status(422).json({ ok: false, error: 'The roleId field is required' });
    if (!status) return response.status(422).json({ ok: false, error: 'The status field is required' });

    // address parts
    if (!country) return response.status(422).json({ ok: false, error: 'The country field is required' });
    if (!state) return response.status(422).json({ ok: false, error: 'The state field is required' });
    if (!city) return response.status(422).json({ ok: false, error: 'The city field is required' });
    if (!neighborhood) return response.status(422).json({ ok: false, error: 'The neighborhood field is required' });
    if (!address) return response.status(422).json({ ok: false, error: 'The address field is required' });
    if (!postalCode) return response.status(422).json({ ok: false, error: 'The postalCode field is required' });

    next();
};