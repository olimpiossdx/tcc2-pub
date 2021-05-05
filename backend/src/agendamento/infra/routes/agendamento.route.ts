import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';
import AgendamentoController from "../http/controllers/AgendamentoController";

const agendamentoRouter = Router();
const agendamentoController = new AgendamentoController();
agendamentoRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      agendamento: {
        nome: Joi.string().required(),
        horarioInicio:Joi.string().required(),
        horarioFim:Joi.string().required(),

        bloco:{
          id: Joi.string().required(),
          nome: Joi.string().required(),
          numero:Joi.number().required()
        },
        
        laboratorio:{
          id: Joi.string().required(),
          nome: Joi.string().required(),
          numero:Joi.number().required()
        }
      }
    }
  }), agendamentoController.CreateAsync);
