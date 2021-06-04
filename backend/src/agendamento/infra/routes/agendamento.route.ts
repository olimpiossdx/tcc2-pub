import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AgendamentoController from '../http/controllers/AgendamentoController';
import ensureAuthenticatedAsync from '../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();

agendamentoRouter.post('/', ensureAuthenticatedAsync,
  celebrate({
    [Segments.BODY]: {
      blocoId: Joi.string().required(),
      laboratorioId: Joi.string().required(),
      data: Joi.string().required(),
      horarioInicio: Joi.string().required(),
      horarioFim: Joi.string().required()
    }
  }), agendamentoController.CreateAsync);

export default agendamentoRouter;