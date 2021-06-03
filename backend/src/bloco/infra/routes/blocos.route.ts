import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';
import BlocosController from "../http/controllers/BlocosController";

const blocosRouter = Router();
const blocosController = new BlocosController();

blocosRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      laboratorios: [{
        nome: Joi.string().required(),
        numero: Joi.number().required()
      }]
    }
  }), blocosController.CreateAsync);
