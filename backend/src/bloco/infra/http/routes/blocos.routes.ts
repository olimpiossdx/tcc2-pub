import { Router } from 'express';
import BlocosController from '../controllers/BlocosController';

const blocosController = new BlocosController();

const blocosRouter = Router();

blocosRouter.get('/', blocosController.GetAsync);
blocosRouter.post('/', blocosController.CreateAsync);

export default blocosRouter;