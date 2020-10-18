import { Router } from 'express';

import AuthRoutes from './auth.routes';
import OrphanageRoutes from './orphanage.routes';
import UserRoutes from './user.routes';

const routes = Router();

routes.use('/auth', AuthRoutes);
routes.use('/orphanages', OrphanageRoutes);
routes.use('/users', UserRoutes);

export default routes;
