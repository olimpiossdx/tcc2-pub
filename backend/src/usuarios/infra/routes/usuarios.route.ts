import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';
import UsuariosController from "../http/controllers/UsuariosController";

const usuariosRouter = Router();
const usuariosController = new UsuariosController();

usuariosRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      urlImg: Joi.string(),
      acessKey: Joi.string().required()
    }
  }), usuariosController.CreateAsync);
