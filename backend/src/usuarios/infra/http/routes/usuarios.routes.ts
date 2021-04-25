import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsuariosController from '../controllers/UsuariosController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usuariosController = new UsuariosController();

const usuariosRouter = Router();

usuariosRouter.post('/', usuariosController.create);
usuariosRouter.patch('/chave-acesso', ensureAuthenticated, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    accessKey: Joi.string().required().min(8)
  }
}), usuariosController.update);

export default usuariosRouter;