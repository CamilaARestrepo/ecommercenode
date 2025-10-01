import { Router, Request, Response } from 'express';
import userRouter from './users-route';

// Swagger UI setup
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml');

const appRouter: Router = Router();

appRouter.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        ok: true,
        message: 'Api is working'
    });
});

// Swagger docs at /api/v1/api-docs
appRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

appRouter.use('/api/v1', userRouter);

export default appRouter;