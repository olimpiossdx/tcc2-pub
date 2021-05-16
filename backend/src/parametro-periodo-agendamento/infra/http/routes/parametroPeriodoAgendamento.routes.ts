import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ParametroPeriodoAgendamentoController from '../controllers/parametroPeriodoAgendamentoController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const parametroPeriodoAgendamentoController = new ParametroPeriodoAgendamentoController();
const parametroPeriodoAgendamentoRouter = Router();

parametroPeriodoAgendamentoRouter.post('/', ensureAuthenticatedAsync, parametroPeriodoAgendamentoController.CreateAsync);
parametroPeriodoAgendamentoRouter.put('/update', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    periodo: Joi.string().required()
  }
}), parametroPeriodoAgendamentoController.UpdateAsync);

export default parametroPeriodoAgendamentoRouter;
