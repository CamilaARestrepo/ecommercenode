import { IUserRepository } from "../../domain/repositories/IUser-repository";
import { User } from "../../domain/entities/User";
import { UserModel } from "../database/user-mongo";
import { IUsers } from "../../domain/models/interfaces/IUsers";

export class MongoUserRepository implements IUserRepository {
    async save(user: User): Promise<User> {
        const created = await UserModel.create(user);
        const plainUser = created.toObject();
        if (plainUser._id && typeof plainUser._id !== 'string') {
            plainUser._id = plainUser._id.toString();
        }
        // Aquí el type assertion:
        return new User(plainUser as IUsers);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        if (!userDoc) {
            return null;
        }

        const plainUser = userDoc.toObject();
        if (plainUser._id && typeof plainUser._id !== 'string') {
            plainUser._id = plainUser._id.toString();
        }

        return new User(plainUser as IUsers);
    }
    
    async findById(id: string): Promise<User> {
        const resutl = await UserModel.findById(id)
        if (!resutl) {
            return null;
        }
        const userObject = resutl.toObject();
        if (userObject._id && typeof userObject._id !== 'string') {
            userObject._id = userObject._id.toString();
        }
        return new User(userObject as IUsers);
    }

    async findAll(): Promise<User[]> {
        const users = await UserModel.find();
        return users.map(userDoc => {
            const plainUser = userDoc.toObject();
            if (plainUser._id && typeof plainUser._id !== 'string') {
                plainUser._id = plainUser._id.toString();   
            }
            return new User(plainUser as IUsers);
        });
    }

    async update(id: string, updatedData: Partial<User>): Promise<User> {
        const updatedUserDoc = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedUserDoc) {
            throw new Error('User not found');
        }
        const plainUser = updatedUserDoc.toObject();
        if (plainUser._id && typeof plainUser._id !== 'string') {
            plainUser._id = plainUser._id.toString();
        }
        return new User(plainUser as IUsers);
    }


}

