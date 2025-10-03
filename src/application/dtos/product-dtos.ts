import { IProduct } from "../../domain/models/interfaces/IProduct";

export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images?: string[];
}

export function buildProductRequest(dti: ProductRequest): IProduct {
    return {
        id: '',
        name: dti.name,
        description: dti.description,
        price: dti.price,
        stock: dti.stock,
        categoryId: dti.categoryId,
        images: dti.images || []
    };
}