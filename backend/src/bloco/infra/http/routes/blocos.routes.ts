import { Router } from 'express';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';
import BlocosController from '../controllers/BlocosController';

const blocosController = new BlocosController();

const blocosRouter = Router();

blocosRouter.get('/', blocosController.GetAsync);
blocosRouter.post('/', blocosController.CreateAsync);
blocosRouter.post('/laboratorios-disponiveis', ensureAuthenticatedAsync, blocosController.GetLaboratorioDisponiveisAsync);

export default blocosRouter;