import Agendamento from '../infra/firebase/entities/Agendamento';

export default interface IAgendamentoRepository {
  GetAsync(): Promise<Agendamento[]>;
  FindAsync(id: string): Promise<Agendamento | undefined>;
  CreateAsync(data: Agendamento): Promise<void>;
  UpdateAgendamentoAsync(agendamento: Agendamento): Promise<void>;
};
