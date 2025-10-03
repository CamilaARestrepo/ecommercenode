import express, { Router, Request, Response } from 'express';
import { createProduct } from '../controllers/products-controllers';

const productRouter: Router = express.Router();

productRouter.post('/product', createProduct);

export default productRouter;