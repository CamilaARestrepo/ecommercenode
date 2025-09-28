import express, { Router, Request, Response } from 'express';
import { useParamValidation } from '../middlewares/users-validators';
import { createUser } from '../controllers/user-controller';

const userRouter: Router = express.Router();

userRouter.post('/user',useParamValidation,createUser)


export default userRouter;