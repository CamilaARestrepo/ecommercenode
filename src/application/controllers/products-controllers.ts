import { Request, Response } from 'express';
import { saveProduct } from '../../domain/services/product-services';
import { buildProductRequest, ProductRequest } from '../dtos/product-dtos';
import { MongoProductRepository } from '../../infraestructure/repositories/mongo-products';

const productRepo = new MongoProductRepository();

export const createProduct = async (request : Request, response : Response) => {
    try {
        const newProduct = buildProductRequest(request.body);
        const result = await saveProduct(productRepo, newProduct);
        response.status(201).json({
            ok: true,
            message: 'Product created successfully',
            product: result
        });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: (error as Error).message
        });
    }
}
