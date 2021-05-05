import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AgendamentoController from '../controllers/AgendamentoController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const agendamentoController = new AgendamentoController();
const agendamentoRouter = Router();

agendamentoRouter.post('/', ensureAuthenticatedAsync,agendamentoController.CreateAsync);
agendamentoRouter.put('/update', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    data: Joi.string().required(),
    horarioInicio: Joi.string().required(),
    horarioFim: Joi.string().required(),
    
    bloco:{
      id: Joi.string().required(),
      nome: Joi.string().required(),
      numero: Joi.number().required()
    },
    
    laboratorio: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
      numero: Joi.number().required()
    }
  }
}), agendamentoController.UpdateAsync);

export default agendamentoRouter;
