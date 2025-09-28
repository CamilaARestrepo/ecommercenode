import { Router, Request, Response } from 'express';
import userRouter from './users-route';

const appRouter: Router = Router();

appRouter.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        ok: true,
        message: 'Api is working'
    });
});

appRouter.use('/api/v1', userRouter);

export default appRouter;