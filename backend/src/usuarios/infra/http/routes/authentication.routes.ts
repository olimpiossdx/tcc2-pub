import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const authenticationController = new AuthenticationController();

const authenticationRouter = Router();

authenticationRouter.get('/', ensureAuthenticated, authenticationController.create)

export default authenticationRouter;