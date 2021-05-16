import { isEqual } from 'date-fns';
import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import ParametroPeriodoAgendamento from '../../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../IParametroPeriodoAgendamentoRepository';

class FakeAgendamentoRepository extends FakeBaseRepository<ParametroPeriodoAgendamento> implements IParametroPeriodoAgendamentoRepository {
  constructor() {
    super('agendamento');
  };

  public async FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<ParametroPeriodoAgendamento | undefined> {
    const model = this.contextDatabase.find(agendamento => {
      return (agendamento.bloco.id === blocoId && agendamento.laboratorio.id == laboratorioId && isEqual(agendamento.data, data) && isEqual(agendamento.horarioInicio, horarioInicio) && isEqual(agendamento.horarioFim, horarioFim));
    });
    return model;
  };
};

export default FakeAgendamentoRepository;
