import Bloco from '../../infra/firebase/entities/Bloco';
import IBlocoRepository from '../IBlocoRepository';

class FakeBlocoRepository implements IBlocoRepository {
  private blocos: Bloco[] = [];

  public async GetAsync(): Promise<Bloco[]> {
    return this.blocos;
  };

  public async FindByNomeAsync(nome: string): Promise<Bloco | undefined> {
    return this.blocos.find(bloco => bloco.nome.toLocaleLowerCase() == nome.toLocaleLowerCase());
  };

  public async FindByIdAsync(id: string): Promise<Bloco | undefined> {
    return this.blocos.find(bloco => bloco.id === id);
  };

  public async CreateAsync(data: Bloco): Promise<Bloco> {
    this.blocos.push(data);
    return data;
  };

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    const blocoIndex = this.blocos.findIndex(item => item.id === bloco.id);
    this.blocos[blocoIndex] = bloco;
  };
};

export default FakeBlocoRepository;