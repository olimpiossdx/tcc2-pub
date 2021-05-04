import Bloco from '../infra/firebase/entities/Bloco';

export default interface IBLocoRepository {
  GetAsync(): Promise<Bloco[]>;
  FindAsync(id: string): Promise<Bloco | undefined>;
  CreateAsync(data: Bloco): Promise<void>;
  UpdateBlocoAsync(bloco: Bloco): Promise<void>;
};
