import { IUsers } from "../../domain/models/interfaces/IUsers";

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
}

export interface UserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    idType: string;
    idNumber: string;
    phone: string;
    roleId: string;
    gender: string;
    birthDate: string;
    status: UserStatus;
    country: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    postalCode: string;
    createdAt: Date;
    updatedAt: Date;
    paymentMethodId: string;
}


export function buildUserRequest(dto: UserRequest): IUsers {
    return {
        email: dto.email,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName,
        idType: dto.idType,
        idNumber: dto.idNumber,
        phone: dto.phone,
        roleId: dto.roleId,
        gender: dto.gender,
        birthDate: dto.birthDate,
        status: dto.status,
        country: dto.country,
        state: dto.state,
        city: dto.city,
        neighborhood: dto.neighborhood,
        address: dto.address,
        postalCode: dto.postalCode,
        createdAt: dto.createdAt,
        updatedAt: dto.updatedAt,
        paymentMethodId: dto.paymentMethodId,
    };
}