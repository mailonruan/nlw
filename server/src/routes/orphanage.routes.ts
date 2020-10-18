import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer'; 

import OrphanagesController from '../controllers/OrphanagesController';

import Auth from '../middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

/* ORPHANAGES */
routes.get('/', OrphanagesController.index);
routes.get('/:id', OrphanagesController.show);

routes.post('/', upload.array('images'), OrphanagesController.create);
routes.post('/:id/sponsor', Auth, OrphanagesController.sponsor);

export default routes;