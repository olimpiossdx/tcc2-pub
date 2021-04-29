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

  public async FindAsync(id: string): Promise<Bloco | undefined> {
    throw new Error('Method not implemented.');
  };

  public async UpdateBlocoAsync(bloco: Bloco): Promise<void> {
    await this.blocosRepository.child(bloco.id).update(bloco);
  };

  public async CreateAsync(data: Bloco): Promise<void> {
    await this.blocosRepository.child(data.id).update(data);
  };
};

export default BlocosRepository;