import ICreteAgendamentoDTO from '../../dtos/ICreteAgendamentoDTO';
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