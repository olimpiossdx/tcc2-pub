import { Router } from 'express';
import BlocoController from '../controllers';

const blocoController = new BlocoController();

const blocosRouter = Router();

blocosRouter.get('/blocos', blocoController.index)

export default blocosRouter;