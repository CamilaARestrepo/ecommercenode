import { IProductRepository } from "../../domain/repositories/IProduct-repository";
import { Product } from "../../domain/entities/Product";
import { ProductModel } from "../database/Product-mongo";
import { IProduct } from "../../domain/models/interfaces/IProduct";

export class MongoProductRepository implements IProductRepository {
    async save(product: Product): Promise<Product> {
        const created = await ProductModel.create(product);
        const plainProduct = created.toObject();
        if (plainProduct._id && typeof plainProduct._id !== 'string') {
            plainProduct._id = plainProduct._id.toString();
        }
        return new Product(plainProduct as IProduct);
    }
}