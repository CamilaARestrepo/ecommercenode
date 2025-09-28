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