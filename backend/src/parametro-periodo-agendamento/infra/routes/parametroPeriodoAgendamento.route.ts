import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ParametroPeriodoAgendamentoController from '../http/controllers/parametroPeriodoAgendamentoController';

const parametroPeriodoAgendamentoRouter = Router();
const parametroPeriodoAgendamentoController = new ParametroPeriodoAgendamentoController();

parametroPeriodoAgendamentoRouter.post('/', celebrate({ [Segments.BODY]: { nome: Joi.string().required() } }), parametroPeriodoAgendamentoController.CreateAsync);

export default parametroPeriodoAgendamentoRouter;