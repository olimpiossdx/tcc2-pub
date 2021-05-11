import Agendamento from '../infra/firebase/entities/Agendamento';

export default interface IAgendamentoRepository {
  GetAsync(): Promise<Agendamento[]>;
  FindAsync(id: string): Promise<Agendamento | undefined>;
  FindSpecificAsync(data: Date, blocoId: string, laboratorioId: string, horarioInicio: Date, horarioFim: Date): Promise<Agendamento | undefined>;
  CreateAsync(data: Agendamento): Promise<Agendamento>;
  UpdateAgendamentoAsync(agendamento: Agendamento): Promise<void>;
};
