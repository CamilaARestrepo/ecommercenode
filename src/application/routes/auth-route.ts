import express, { Router } from 'express';
import { validateLogin } from '../middlewares/auth-validators';
import { login, getLogin } from '../controllers/auth-controller';
import { authenticateToken } from '../middlewares/auth-middleware';

const authRouter: Router = express.Router();

// Rutas públicas
authRouter.post('/auth/login', validateLogin, login);

// Rutas protegidas (requieren token)
authRouter.get('/auth/session', authenticateToken, getLogin);

export default authRouter;