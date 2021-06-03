import IBaseRepository from '../../shared/service/IBaseRepository';
import Bloco from '../infra/firebase/entities/Bloco';

export default interface IBLocoRepository extends IBaseRepository {
  FindByIdAsync(id: string): Promise<Bloco | undefined>;
  FindByNomeAsync(nome: string): Promise<Bloco | undefined>;
};
