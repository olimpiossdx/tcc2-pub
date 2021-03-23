import { Router } from 'express';
import HorarioDisponivelController from '../controllers';

const horarioDiponivelController = new HorarioDisponivelController();

const horarioDiponivelRouter = Router();

horarioDiponivelRouter.get('/horarioDiponivel', horarioDiponivelController.index)

export default horarioDiponivelRouter;