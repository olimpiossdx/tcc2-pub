import { Router } from "express";
import agendamentosRouter from '../../../../agendamento/routes';
import blocosRouter from "../../../../bloco/routes";
import usuariosRouter from "../../../../usuarios/infra/http/routes/usuarios.routes";


const routes = Router();

routes.use('/agendamentos', agendamentosRouter);
routes.use('/blocos', blocosRouter);
routes.use('/usuarios', usuariosRouter);

export default routes;