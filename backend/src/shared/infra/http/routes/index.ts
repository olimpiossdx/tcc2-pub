import { Router } from "express";
import agendamentosRouter from '../../../../agendamento/routes';
import blocosRouter from "../../../../bloco/infra/http/routes/blocos.routes";
import authenticationRouter from "../../../../usuarios/infra/http/routes/authentication.routes";
import usuariosRouter from "../../../../usuarios/infra/http/routes/usuarios.routes";


const routes = Router();

routes.use('/agendamentos', agendamentosRouter);
routes.use('/blocos', blocosRouter);

routes.use('/usuarios', usuariosRouter);
routes.use('/authentication', authenticationRouter);

export default routes;