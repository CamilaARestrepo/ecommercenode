import { IProductRepository } from "../repositories/IProduct-repository";
import { Product } from "../entities/Product";
import { IProduct } from "../models/interfaces/IProduct";


export const saveProduct = async ( productRepo: IProductRepository, productData: IProduct ): Promise<Product> => {
    try {
        const product = new Product(productData);
        return await productRepo.save(product);
    } catch (error) {
        throw new Error(`[ERROR TO SERVICE] Error saving product: ${error}`);
    }
};