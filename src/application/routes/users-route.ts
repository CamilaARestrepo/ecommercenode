import express, { Router, Request, Response } from 'express';
import { useParamValidation } from '../middlewares/users-validators';
import { createUser,getUserProfile,getAllUsers } from '../controllers/user-controller';

const userRouter: Router = express.Router();

userRouter.post('/user',useParamValidation,createUser)

userRouter.get('/user/profile/:id',getUserProfile)
userRouter.get('/users',getAllUsers)


export default userRouter;