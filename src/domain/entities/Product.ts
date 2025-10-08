import { IProduct } from "../models/interfaces/IProduct";

export class Product implements IProduct {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    images: string[];
    id: string;

    constructor(product: IProduct & { id?: string }) {
        this.id = product.id || '';
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.categoryId = product.categoryId;
        this.images = product.images;
    }
}
    
