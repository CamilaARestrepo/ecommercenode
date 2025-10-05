import { IProduct } from "../../domain/models/interfaces/IProduct";

export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images?: string[];
}

export function buildProductRequest(dto: ProductRequest): IProduct {
    return {
        id: '',
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
        categoryId: dto.categoryId,
        images: dto.images || []
    };
}