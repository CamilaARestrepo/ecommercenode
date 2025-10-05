import { LoginAttemptModel } from '../database/login-mongo';

export class MongoLoginAttemptRepository {
    async getByIdNumber(idNumber: string) {
        return await LoginAttemptModel.findOne({ idNumber }).exec();
    }

    async incrementRetries(idNumber: string) {
        const updated = await LoginAttemptModel.findOneAndUpdate(
            { idNumber },
            { $inc: { retries: 1 }, $set: { updatedAt: new Date() } },
            { upsert: true, new: true }
        ).exec();
        return updated;
    }

    async resetRetries(idNumber: string, token?: string) {
        const updated = await LoginAttemptModel.findOneAndUpdate(
            { idNumber },
            { $set: { retries: 0, token: token || '', updatedAt: new Date() } },
            { upsert: true, new: true }
        ).exec();
        return updated;
    }

    async setToken(idNumber: string, token: string) {
        const updated = await LoginAttemptModel.findOneAndUpdate(
            { idNumber },
            { $set: { token, updatedAt: new Date() } },
            { upsert: true, new: true }
        ).exec();
        return updated;
    }
}
