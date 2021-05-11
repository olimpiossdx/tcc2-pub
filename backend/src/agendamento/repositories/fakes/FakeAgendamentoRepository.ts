import { isEqual } from 'date-fns';
import Agendamento from '../../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../IAgendmanetoRepository';

class FakeAgendamentoRepository implements IAgendamentoRepository {
  private agendamentos: Agendamento[] = [];

  public async GetAsync(): Promise<Agendamento[]> {
    return this.agendamentos;
  }

  public async FindAsync(id: string): Promise<Agendamento | undefined> {
    return this.agendamentos.find(bloco => bloco.id === id);
  };

  public async FindSpecificAsync(data: Date, blocoId: string, laboratorioId: string, horarioInicio: Date, horarioFim: Date): Promise<Agendamento | undefined> {
    return this.agendamentos.find(agendamento => agendamento.bloco.id === blocoId && agendamento.laboratorio.id == laboratorioId
      && isEqual(agendamento.data, data) && isEqual(agendamento.horarioInicio, horarioInicio) && isEqual(agendamento.horarioFim, horarioFim));
  };

  public async CreateAsync(data: Agendamento): Promise<Agendamento> {
    this.agendamentos.push(data);
    return data;
  };

  public async UpdateAgendamentoAsync(agendamento: Agendamento): Promise<void> {
    const agendamentoIndex = this.agendamentos.findIndex(item => item.id === agendamento.id);
    this.agendamentos[agendamentoIndex] = agendamento;
  };
};

export default FakeAgendamentoRepository;