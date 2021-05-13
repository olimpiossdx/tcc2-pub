import { isEqual } from 'date-fns';
import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import Agendamento from '../../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../IAgendmanetoRepository';

class FakeAgendamentoRepository extends FakeBaseRepository<Agendamento> implements IAgendamentoRepository {
  constructor() {
    super('agendamento');
  };

  public async FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<Agendamento | undefined> {
    const model = this.contextDatabase.find(agendamento => {
      return (agendamento.bloco.id === blocoId && agendamento.laboratorio.id == laboratorioId && isEqual(agendamento.data, data) && isEqual(agendamento.horarioInicio, horarioInicio) && isEqual(agendamento.horarioFim, horarioFim));
    });
    return model;
  };
};

export default FakeAgendamentoRepository;
