import { Router } from "express";
import agendamentoRouter from "../../../../agendamento/infra/routes/agendamento.route";

import blocosRouter from "../../../../bloco/infra/http/routes/blocos.routes";
import parametroPeriodoAgendamentoRouter from "../../../../parametro-periodo-agendamento/infra/http/routes/parametroPeriodoAgendamento.routes";
import authenticationRouter from "../../../../usuarios/infra/http/routes/authentication.routes";
import usuariosRouter from "../../../../usuarios/infra/http/routes/usuarios.routes";


const routes = Router();

routes.use('/parametro-periodo-agendamento', parametroPeriodoAgendamentoRouter);
routes.use('/agendamentos', agendamentoRouter);
routes.use('/blocos', blocosRouter);

routes.use('/usuarios', usuariosRouter);
routes.use('/authentication', authenticationRouter);

export default routes;