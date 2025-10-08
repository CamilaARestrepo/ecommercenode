import mongoose from "mongoose";
import { IProductDocument } from "../interface/IProduct-mongo";

const ProductSchema = new mongoose.Schema<IProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoryId: { type: String, required: true },
    images: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);