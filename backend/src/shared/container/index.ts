import { container } from 'tsyringe';

import UsuariosRepository from '../../usuarios/infra/firebase/repositories/UsuariosRepository';
import IUsuariosRepository from '../../usuarios/repositories/IUsuariosRepository';

import IBLocoRepository from '../../bloco/repositories/IBlocoRepository';
import BlocoRepository from '../../bloco/infra/firebase/repositories/BlocoRepository';

import IAgendamentoRepository from '../../agendamento/repositories/IAgendmanetoRepository';
import AgendamentoRepository from '../../agendamento/infra/firebase/repositories/AgendamentoRepository';

import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import ParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/infra/firebase/repositories/parametroPeriodoAgendamentoRepository';


container.registerSingleton<IUsuariosRepository>('UsuariosRepository', UsuariosRepository);
container.registerSingleton<IBLocoRepository>('BlocoRepository', BlocoRepository);
container.registerSingleton<IAgendamentoRepository>('AgendamentoRepository', AgendamentoRepository);
container.registerSingleton<IParametroPeriodoAgendamentoRepository>('ParametroPeriodoAgendamentoRepository', ParametroPeriodoAgendamentoRepository);