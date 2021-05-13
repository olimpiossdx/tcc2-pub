import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../../config/firebase.config';
import IBlocoRepository from '../../../repositories/IBlocoRepository';
import Bloco from '../entities/Bloco';

export interface objecToArray {
  [key: string]: any;
};

class BlocosRepository implements IBlocoRepository {
  private blocosRepository: database.Reference;

  constructor() {
    this.blocosRepository = firebaseDatabase.ref('blocos');
  };

  public async GetAsync(): Promise<Bloco[]> {
    const response = await this.blocosRepository.orderByChild('id').get();
    const blocos = new Array<Bloco>();

    if (response.exists()) {
      const blocoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(blocoJson)[0];
      Object.assign(blocos, blocoJson[hashkey]);
    };

    return blocos;
  };

  public async FindByNomeAsync(nome: string): Promise<Bloco | undefined> {
    const response = await this.blocosRepository.orderByChild('nome').equalTo(nome).get();
    let bloco: Bloco | undefined = undefined;

    if (response.exists()) {
      bloco = new Bloco();
      const blocoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(blocoJson)[0];
      Object.assign(bloco, blocoJson[hashkey]);
    };

    return bloco;
  };


  public async FindByIdAsync(id: string): Promise<Bloco | undefined> {
    const response = await this.blocosRepository.orderByChild('id').equalTo(id).get();
    let bloco: Bloco | undefined = undefined;;

    if (!response.exists()) {
      return bloco;
    };

    bloco = new Bloco();
    const blocoJson = response.toJSON() as objecToArray;

    const hashkey = Object.keys(blocoJson)[0];
    Object.assign(bloco, blocoJson[hashkey]);

    return bloco;
  };

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    await this.blocosRepository.child(bloco.id).update(bloco);
  };

  public async CreateAsync(data: Bloco): Promise<Bloco> {
    await this.blocosRepository.child(data.id).update(data);
    return data;
  };
};

export default BlocosRepository;