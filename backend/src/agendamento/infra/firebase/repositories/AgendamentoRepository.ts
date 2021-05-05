import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../../config/firebase.config';
import IAgendamentoRepository from '../../../repositories/IAgendmanetoRepository';
import Agendamento from '../entities/Agendamento';

export interface objecToArray {
  [key: string]: any;
};

class BlocosRepository implements IAgendamentoRepository {
  private agendamentoRepository: database.Reference;

  constructor() {
    this.agendamentoRepository = firebaseDatabase.ref('agendamentos');
  };
  
  public async GetAsync(): Promise<Agendamento[]> {
    //TODO: Editar regra de ordenação, colocar por data
    const response = await this.agendamentoRepository.orderByChild('id').get();
    let agendamentos = new Array<Agendamento>();

    if (response.exists()) {
      const agendamentosJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(agendamentosJson)[0];
      Object.assign(agendamentos, agendamentosJson[hashkey]);
    } 
    
    return agendamentos;
  };

  public async FindAsync(id: string): Promise<Agendamento | undefined> {
    const response = await this.agendamentoRepository.orderByChild('id').equalTo(id).get();
    let agendamento: Agendamento | undefined = undefined;

    if (response.exists()) {
      const agendamentoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(agendamentoJson)[0];
      Object.assign(Agendamento, AgendamentoJson[hashkey]);
    } 

    return agendamento;
  };

  public async UpdateAgendamentoAsync(agendamento:Agendamento): Promise<void> {
    await this.agendamentoRepository.child(agendamento.id).update(bloco);
  };

  public async CreateAsync(data: Agendamentoo): Promise<void> {
    await this.agendamentoRepository.child(data.id).update(data);
  };
};

export default BlocosRepository;
