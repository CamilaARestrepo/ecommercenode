import express, { Router } from 'express';
import { validateLogin } from '../middlewares/auth-validators';
import { login, getLogin } from '../controllers/auth-controller';
import { authenticateToken } from '../middlewares/auth-middleware';
import { useParamValidation } from '../middlewares/users-validators';
import { createUser } from '../controllers/user-controller';
import { logout } from '../controllers/auth-controller';

const authRouter: Router = express.Router();


authRouter.post('/auth/login', validateLogin, login);
authRouter.get('/auth/session', authenticateToken, getLogin);
authRouter.post('/auth/logout', authenticateToken, logout);
authRouter.post('/auth/register', useParamValidation, createUser);

export default authRouter;