import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import ensureAuthenticatedAsync from '../middlewares/ensureAuthenticated';

const authenticationController = new AuthenticationController();

const authenticationRouter = Router();

authenticationRouter.get('/', ensureAuthenticatedAsync, authenticationController.CreateAsync)

export default authenticationRouter;