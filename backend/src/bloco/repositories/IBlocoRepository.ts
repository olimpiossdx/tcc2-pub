import Bloco from '../infra/firebase/entities/Bloco';

export default interface IBLocoRepository {
  GetAsync(): Promise<Bloco[]>;
  FindByIdAsync(id: string): Promise<Bloco | undefined>;
  FindByNomeAsync(nome: string): Promise<Bloco | undefined>;
  CreateAsync(data: Bloco): Promise<void>;
  UpdateBlocoAsync(bloco: Bloco): Promise<void>;
};
