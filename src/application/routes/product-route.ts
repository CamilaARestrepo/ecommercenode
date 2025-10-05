import express, { Router, Request, Response } from 'express';
import { createProduct } from '../controllers/products-controllers';
import { validateProduct } from '../middlewares/product-middleware';
import { authenticateToken, authorizeRole } from '../middlewares/auth-middleware';


const productRouter: Router = express.Router();

productRouter.post('/product',authenticateToken,authorizeRole(["admin","user"]), validateProduct, createProduct);
productRouter.patch('/product/:id', authenticateToken, authorizeRole(["admin","user"]));

export default productRouter;