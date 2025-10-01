import { IUserRepository } from "../repositories/IUser-repository";
import { User } from "../entities/User";
import { IUsers } from "../models/interfaces/IUsers";
import * as bcrypt from 'bcryptjs';

export const saveUser = async (userRepo: IUserRepository, user: IUsers) => {
    try {
        const newUser = new User(user);
        return await userRepo.save(newUser);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error saving user: ${error}`);
    }
};

export const findUserByEmail = async (userRepo: IUserRepository, email: string): Promise<User | null> => {
    try {
        return await userRepo.findByEmail(email);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error finding user by email: ${error}`);
    }
};

export const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error hashing password: ${error}`);
    }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error comparing password: ${error}`);
    }
};