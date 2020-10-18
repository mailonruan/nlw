import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const routes = Router();

/* Auth */
routes.post('/login', AuthController.login);

export default routes;