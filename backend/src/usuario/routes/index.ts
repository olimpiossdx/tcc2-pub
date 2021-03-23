import { Router } from 'express';
import UsuarioController from '../controllers';

const usuarioController = new UsuarioController();

const usuarioRouter = Router();

usuarioRouter.get('/usuario', usuarioController.index)

export default usuarioRouter;