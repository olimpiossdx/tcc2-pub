import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../../config/firebase.config';
import IBlocoRepository from '../../../repositories/IAgendmanetoRepository';
import Bloco from '../entities/Agendamento';

//TODO: alterar paras regras de AGENDAMENTO
export interface objecToArray {
  [key: string]: any;
};

class BlocosRepository implements IBlocoRepository {
  private blocosRepository: database.Reference;

  constructor() {
    this.blocosRepository = firebaseDatabase.ref('blocos');
  };

  public async GetAsync(id: string): Promise<Bloco[]> {
    // TODO: ajustar retorno para lista
    const response = await this.blocosRepository.orderByChild('id').get();
    let bloco: Bloco | undefined = new Bloco();

    if (response.exists()) {
      const blocoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(blocoJson)[0];
      Object.assign(bloco, blocoJson[hashkey]);

    } else {
      bloco = undefined;
    };

    return new Array<Bloco>();
  };

  public async FindAsync(id: string): Promise<Bloco | undefined> {
    const response = await this.blocosRepository.orderByChild('id').equalTo(id).get();
    let bloco: Bloco | undefined = new Bloco();

    if (response.exists()) {
      const blocoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(blocoJson)[0];
      Object.assign(bloco, blocoJson[hashkey]);

    } else {
      bloco = undefined;
    };

    return bloco;
  };

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    await this.blocosRepository.child(bloco.id).update(bloco);
  };

  public async CreateAsync(data: Bloco): Promise<void> {
    await this.blocosRepository.child(data.id).update(data);
  };
};

export default BlocosRepository;