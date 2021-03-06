import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ParametroPeriodoAgendamentoController from '../controllers/parametroPeriodoAgendamentoController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const parametroPeriodoAgendamentoController = new ParametroPeriodoAgendamentoController();
const parametroPeriodoAgendamentoRouter = Router();

parametroPeriodoAgendamentoRouter.get('/', ensureAuthenticatedAsync, parametroPeriodoAgendamentoController.GetAsync);
parametroPeriodoAgendamentoRouter.post('/', ensureAuthenticatedAsync,
  celebrate({
    [Segments.BODY]: {
      periodo: Joi.number().required(),
      horarioInicio: Joi.string().required(),
      horarioFim: Joi.string().required()
    }
  }), parametroPeriodoAgendamentoController.CreateAsync);

parametroPeriodoAgendamentoRouter.put('/', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    periodo: Joi.number().required(),
    horarioInicio: Joi.string().required(),
    horarioFim: Joi.string().required() 
  }
}), parametroPeriodoAgendamentoController.UpdateAsync);

export default parametroPeriodoAgendamentoRouter;
