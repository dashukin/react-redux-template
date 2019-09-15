import { Router } from 'express';
import { getExample } from './__example';

const apiRouter = Router();

apiRouter.get('/example', getExample);

export default apiRouter;
