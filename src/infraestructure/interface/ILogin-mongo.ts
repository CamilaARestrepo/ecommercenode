export interface ILoginDocument {
    idNumber: string;
    token?: string;
    retries: number;
    updatedAt?: Date;
    createdAt?: Date;
}

export default ILoginDocument;
