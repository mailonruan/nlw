import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import Auth from '../middlewares/auth';

const routes = Router();

/* Users */
/* routes.get('/', UsersController.index); */
routes.get('/me', Auth,  UsersController.profile);

routes.get('/:id', UsersController.show);
routes.post('/', UsersController.create);


export default routes;