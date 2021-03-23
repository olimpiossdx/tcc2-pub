import { Router } from 'express';
import LaboratorioController from '../controllers';

const laboratorioController = new LaboratorioController();

const laboratorioRouter = Router();

laboratorioRouter.get('/laboratorio', laboratorioController.index)

export default laboratorioRouter;