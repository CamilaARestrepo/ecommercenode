import express, { Router, Request, Response } from "express";
import { createProvider,getProviderById,getProviders } from "../controllers/provider-controller";
import { authenticateToken, authorizeRole } from "../middlewares/auth-middleware";

const providerRouter: Router = express.Router();

providerRouter.post('/provider', authenticateToken, authorizeRole(["admin"]), createProvider);
providerRouter.get('/provider', authenticateToken, authorizeRole(["admin",]), getProviders);
providerRouter.get('/provider/:id', authenticateToken, authorizeRole(["admin"]), getProviderById)



export default providerRouter;