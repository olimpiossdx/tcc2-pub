import Bloco from '../infra/firebase/entities/Bloco';

export default interface IBLocoRepository {
  FindByIdAsync(id: string): Promise<Bloco | undefined>;
  FindByNomeAsync(nome: string): Promise<Bloco | undefined>;
};
