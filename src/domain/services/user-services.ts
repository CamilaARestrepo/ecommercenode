import { IUserRepository } from "../repositories/IUser-repository";
import { User } from "../entities/User";
import { IUsers } from "../models/interfaces/IUsers";

export const saveUser = async (userRepo: IUserRepository, user: IUsers) => {
    try {
        const newUser = new User(user);
        return await userRepo.save(newUser);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error saving user: ${error}`);
    }
};