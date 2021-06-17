import { isEqual } from 'date-fns';
import ParametroPeriodoAgendamento from '../../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import Agendamento from '../../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../IAgendmanetoRepository';

class FakeAgendamentoRepository extends FakeBaseRepository<Agendamento> implements IAgendamentoRepository {
  constructor() {
    super('agendamento');
  }

  public async SearchByPeriodAsync(parametroPeriodoAgendamento: ParametroPeriodoAgendamento, blocoId: string, laboratorioId: string, laboratorioNome: string, data: number): Promise<Agendamento[]> {
    const entities = (this.contextDatabase as Agendamento[]).filter((agendamento: Agendamento) => agendamento.bloco.id === blocoId && agendamento.laboratorio.id === laboratorioId && agendamento.laboratorio.nome === laboratorioNome && agendamento.data === data);
    return entities;
  };

  public async FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<Agendamento | undefined> {
    const model = this.contextDatabase.find((agendamento: Agendamento) => {
      return (agendamento.bloco.id === blocoId && agendamento.laboratorio.id == laboratorioId && isEqual(agendamento.data, data) && isEqual(agendamento.horarioInicio, horarioInicio) && isEqual(agendamento.horarioFim, horarioFim));
    });
    return model;
  };
};

export default FakeAgendamentoRepository;
