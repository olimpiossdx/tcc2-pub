import ICreteBlocoDTO from '../../dtos/ICreteBlocoDTO';
import Bloco from '../../infra/firebase/entities/Bloco';
import IBlocoRepository from '../IBlocoRepository';

class FakeBlocoRepository implements IBlocoRepository {
  private blocos: Bloco[] = [];

  public async GetAsync(): Promise<Bloco[]> {
    return this.blocos;
  }

  public async FindAsync(id: string): Promise<Bloco | undefined> {
    const bloco = this.blocos.find(bloco => bloco.id === id);
    return bloco;
  }

  public async CreateAsync(data: Bloco): Promise<void> {
    this.blocos.push(data);
  }

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    const blocoIndex = this.blocos.findIndex(item => item.id === bloco.id);
    this.blocos[blocoIndex] = bloco;
  }
};

export default FakeBlocoRepository;