import Bloco from '../infra/firebase/entities/Agendamento';

//TODO: alterar paras regras de AGENDAMENTO
export default interface IBLocoRepository {
  GetAsync(): Promise<Bloco[]>;
  FindAsync(id: string): Promise<Bloco | undefined>;
  CreateAsync(data: Bloco): Promise<void>;
  UpdateBlocoAsync(bloco: Bloco): Promise<void>;
};
