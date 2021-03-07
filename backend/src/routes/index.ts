import { Router } from "express";
import agendamentosRouter from '../agendamentos/routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRouter);

export default routes;