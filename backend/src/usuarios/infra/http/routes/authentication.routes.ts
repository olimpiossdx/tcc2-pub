import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';

const authenticationController = new AuthenticationController();

const authenticationRouter = Router();

authenticationRouter.get('/', authenticationController.create)

export default authenticationRouter;