import { Router } from 'express';
import ensureAuthenticatedAsync from '../../usuarios/infra/http/middlewares/ensureAuthenticated';
import BlocoController from '../controllers';

const blocoController = new BlocoController();

const blocosRouter = Router();
// TODO: rota para teste de auth
blocosRouter.get('/', ensureAuthenticatedAsync, blocoController.index)

export default blocosRouter;