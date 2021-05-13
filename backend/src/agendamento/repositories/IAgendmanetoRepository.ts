import IBaseRepository from '../../shared/service/IBaseRepository';
import Agendamento from '../infra/firebase/entities/Agendamento';

interface IAgendamentoRepository extends IBaseRepository {
  FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<Agendamento | undefined>;
};

export default IAgendamentoRepository;
