import { Request, Response, NextFunction } from 'express';

export function validateProduct(request: Request, response: Response, next: NextFunction) {
    const { name, description, price, stock, categoryId, images } = request.body;

    // name
    if (
        typeof name !== 'string' ||
        name.length < 3 ||
        name.length > 50
    ) {
        return response.status(422).json({
            ok: false,
            error: 'The product name must be a string between 3 and 50 characters'
        });
    }

    // description
    if (
        typeof description !== 'string' ||
        description.length < 10 ||
        description.length > 500
    ) {
        return response.status(422).json({
            ok: false,
            error: 'The product description must be a string between 10 and 500 characters'
        });
    }

    // price
    if (
        typeof price !== 'number' ||
        price < 0
    ){
        return response.status(422).json({
            ok: false,
            error: 'The product price must be a positive number'
        });
    }

    // stock
    if (
        typeof stock !== 'number' ||
        !Number.isInteger(stock) ||
        stock < 0
    ){
        return response.status(422).json({
            ok: false,
            error: 'The product stock must be a positive integer'
        });
    }

    // categoryId
    if (
        typeof categoryId !== 'string' 
    ){
        return response.status(422).json({
            ok: false,
            error: 'The category ID must be a string'
        });
    }

    // images
    if (
        !Array.isArray(images) ||
        images.length === 0 ||
        !images.every((img: any) => typeof img === 'string')
    ){
        return response.status(422).json({
            ok: false,
            error: 'The product images must be a non-empty array of strings'
        });
    }

    // Si todo está bien, llama a next() solo una vez
    next();
}
