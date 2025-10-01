import jwt from 'jsonwebtoken';
import { IUserRepository } from "../repositories/IUser-repository";
import { findUserByEmail, comparePassword } from "./user-services";
import { LoginRequest } from "../../application/dtos/auth-dtos";
import { JWTConfig } from "../../infraestructure/config/jwt-config";

export const loginUser = async (userRepo: IUserRepository, loginData: LoginRequest) => {
    try {
        const user = await findUserByEmail(userRepo, loginData.email);
        
        if (!user) {
            return { success: false, message: 'Invalid credentials (wrong email or password)' };
        }


        const isPasswordValid = await comparePassword(loginData.password, user.password);
        
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid credentials (wrong email or password)' };
        }

        const token = generateToken({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId
        });

        return {
            success: true,
            token
        };
    } catch (error) {
        throw new Error(`[ERROR AUTH SERVICE] - Login error: ${error}`);
    }
};

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWTConfig.secret, { expiresIn: JWTConfig.expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWTConfig.secret);
    } catch (error) {
        throw new Error('Invalid token');
    }
};