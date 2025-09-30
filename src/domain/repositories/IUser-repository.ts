import {User} from '../entities/User';

export interface IUserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User>;
}