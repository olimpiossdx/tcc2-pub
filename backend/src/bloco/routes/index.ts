import { Router } from 'express';
import ensureAuthenticated from '../../usuarios/infra/http/middlewares/ensureAuthenticated';
import BlocoController from '../controllers';

const blocoController = new BlocoController();

const blocosRouter = Router();
// TODO: rota para teste de auth
blocosRouter.get('/', ensureAuthenticated, blocoController.index)

export default blocosRouter;