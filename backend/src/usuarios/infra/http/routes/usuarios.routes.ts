import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsuariosController from '../controllers/UsuariosController';
import ensureAuthenticatedAsync from '../middlewares/ensureAuthenticated';
import UsuarioAgendmentoController from '../controllers/UsuarioAgendmentoController';

const usuariosController = new UsuariosController();
const usuarioAgendmentoController = new UsuarioAgendmentoController();
const usuariosRouter = Router();

usuariosRouter.get('/agendamentos', ensureAuthenticatedAsync, usuarioAgendmentoController.GetAsync);
usuariosRouter.post('/', usuariosController.CreateAsync);
usuariosRouter.patch('/chave-acesso', ensureAuthenticatedAsync, celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    accessKey: Joi.string().required().min(8)
  }
}), usuariosController.UpdateAsync);

export default usuariosRouter;