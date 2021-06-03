import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import BlocosController from '../controllers/BlocosController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const blocosController = new BlocosController();

const blocosRouter = Router();

blocosRouter.get('/', blocosController.GetAsync);
blocosRouter.post('/', blocosController.CreateAsync);

export default blocosRouter;