import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import Bloco from '../../infra/firebase/entities/Bloco';
import IBlocoRepository from '../IBlocoRepository';

class FakeBlocoRepository extends FakeBaseRepository implements IBlocoRepository {
  constructor() {
    super('bloco');
  };

  public async FindByNomeAsync(nome: string): Promise<Bloco | undefined> {
    return this.contextDatabase.find(bloco => bloco.nome.toLocaleLowerCase() == nome.toLocaleLowerCase());
  };

  public async FindByIdAsync(id: string): Promise<Bloco | undefined> {
    return this.contextDatabase.find(bloco => bloco.id === id);
  };

  public async CreateAsync(data: Bloco): Promise<Bloco> {
    this.contextDatabase.push(data);
    return data;
  };

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    const blocoIndex = this.contextDatabase.findIndex(item => item.id === bloco.id);
    this.contextDatabase[blocoIndex] = bloco;
  };
};

export default FakeBlocoRepository;