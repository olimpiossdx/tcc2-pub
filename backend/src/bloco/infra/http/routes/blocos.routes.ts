import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import BlocosController from '../controllers/BlocosController';
import ensureAuthenticatedAsync from '../../../../usuarios/infra/http/middlewares/ensureAuthenticated';

const blocosController = new BlocosController();

const blocosRouter = Router();

//TODO: alterar paras regras de BLOCO
blocosRouter.post('/', blocosController.CreateAsync);
blocosRouter.patch('/chave-acesso', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    accessKey: Joi.string().required().min(8)
  }
}), blocosController.UpdateAsync);

export default blocosRouter;