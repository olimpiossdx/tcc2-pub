import { Router } from "express";
import agendamentosRouter from '../../../../agendamento/routes';

const routes = Router();

routes.use('/agendamentos', agendamentosRouter);

export default routes;