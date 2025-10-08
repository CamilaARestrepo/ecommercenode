import { Document } from "mongoose";

export interface IProductDocument extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}