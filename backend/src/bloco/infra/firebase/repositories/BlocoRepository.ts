import BaseRepository from '../../../../shared/repositories/baseRepository';
import IBlocoRepository from '../../../repositories/IBlocoRepository';
import Bloco from '../entities/Bloco';

export interface objecToArray {
  [key: string]: any;
};

class BlocosRepository extends BaseRepository implements IBlocoRepository {
  constructor() {
    super('blocos');
  };

  public async FindByNomeAsync(nome: string): Promise<Bloco | undefined> {
    const response = await this.contextDatabaseRef.orderByChild('nome').equalTo(nome).get();
    let bloco: Bloco | undefined = undefined;

    if (response.exists()) {
      bloco = new Bloco();
      const blocoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(blocoJson)[0];
      Object.assign(bloco, blocoJson[hashkey]);
    };

    return bloco;
  };

// TODO: melhorar código e padronizar
  public async FindByIdAsync(id: string): Promise<Bloco | undefined> {
    const response = await this.contextDatabaseRef.orderByChild('id').equalTo(id).get();
    let bloco: Array<Bloco> | undefined = undefined;;

    if (!response.exists()) {
      return bloco;
    };

    bloco = new Array<Bloco>();
    const blocoJson = response.toJSON() as objecToArray;

    const hashkey = Object.keys(blocoJson)[0];
    Object.assign(bloco, blocoJson[hashkey]);

    let entity= {} as Bloco;
    const entitiesJson = response.val() as objecToArray;    

    bloco = Object.entries(entitiesJson).map(([prop, value], index) => (value as Bloco)) as Bloco[];

    return bloco[0];
  };
};

export default BlocosRepository;