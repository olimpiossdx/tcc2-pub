import { Router } from 'express';
import AgendamentoController from '../controllers';

const agendamentoController = new AgendamentoController();

const agendamentosRouter = Router();

agendamentosRouter.get('/blocos', agendamentoController.index)
agendamentosRouter.get('/laboratorios', agendamentoController.index);

export default agendamentosRouter;