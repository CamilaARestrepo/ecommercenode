import mongoose, { Schema, } from 'mongoose';

import { IUserDocument } from '../interface/IUser-mongo';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idType: { type: String, required: true },
    idNumber: { type: String, required: true },
    phone: { type: String, required: false },
    roleId: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true }, // O type: Date si prefieres
    status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'BLOCKED'], required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    paymentMethodId: { type: String, required: false }
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);