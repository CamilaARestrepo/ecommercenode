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
}