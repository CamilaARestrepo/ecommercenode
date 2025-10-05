import mongoose, { Schema } from 'mongoose';
import { ILoginDocument } from '../interface/ILogin-mongo';

const LoginSchema: Schema = new Schema({
    idNumber: { type: String, required: true, unique: true },
    token: { type: String, required: false },
    retries: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const LoginAttemptModel = mongoose.model<ILoginDocument>('Login', LoginSchema);
