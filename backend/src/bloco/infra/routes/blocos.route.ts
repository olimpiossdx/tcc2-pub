import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';
import BlocosController from "../http/controllers/BlocosController";

//TODO: alterar paras regras de BLOCO
const blocosRouter = Router();
const blocosController = new BlocosController();
blocosRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      urlImg: Joi.string(),
      acessKey: Joi.string().required()
    }
  }), blocosController.CreateAsync);
