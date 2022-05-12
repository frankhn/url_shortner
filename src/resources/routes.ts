import { Router } from 'express';
import urls from './controllers/urls/url.routes';

const routes = Router();

routes.use('/url', urls);
export default routes;
