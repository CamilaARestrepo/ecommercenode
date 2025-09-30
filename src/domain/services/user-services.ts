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

export const findUserById = async (userRepo: IUserRepository, userId: string) => {
    try {

    const user = await userRepo.findById(userId);
    if (user) {
        return user;
    }
    return null
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] - Error finding user by ID: ${error}`);
    }
}