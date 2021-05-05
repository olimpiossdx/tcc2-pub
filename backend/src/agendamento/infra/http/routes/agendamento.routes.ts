import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AgendamentoController from '../controllers/AgendamentoController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const agendamentoController = new AgendamentoController();

const agendamentoRouter = Router();

//TODO: alterar paras regras de AGENDAMENTO
agendamentoRouter.post('/', agendamentoController.CreateAsync);
agendamentoRouter.patch('/chave-acesso', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    accessKey: Joi.string().required().min(8)
  }
}), agendamentoController.UpdateAsync);

export default agendamentoRouter;
