import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import IBaseRepository from '../../shared/service/IBaseRepository';
import Agendamento from '../infra/firebase/entities/Agendamento';

interface IAgendamentoRepository extends IBaseRepository {
  FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<Agendamento | undefined>;
  SearchByPeriodAsync(parametroPeriodoAgendamento: ParametroPeriodoAgendamento, blocoId: string, laboratorioId: string, laboratorioNome: string, data: number): Promise<any[]>;
};

export default IAgendamentoRepository;
