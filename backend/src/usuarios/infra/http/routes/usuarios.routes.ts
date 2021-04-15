import { Router } from 'express';
import UsuariosController from '../controllers/UsuariosController';

const usuariosController = new UsuariosController();

const usuariosRouter = Router();

usuariosRouter.post('/', usuariosController.create)

export default usuariosRouter;