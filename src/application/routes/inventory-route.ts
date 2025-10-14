import express, { Router } from 'express';
import { updateInventory, updateReservedStock } from '../controllers/inventory-controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth-middleware';
import { validateInventory } from '../middlewares/inventory-middleware';

const inventoryRouter: Router = express.Router();

inventoryRouter.put('/admin/product/inventory/:id', authenticateToken, authorizeRole(["admin"]), validateInventory, updateInventory);
inventoryRouter.patch('/user/cart/product/inventory/hold/:id', authenticateToken, authorizeRole(["admin","user"]), validateInventory, updateReservedStock);

export default inventoryRouter;
