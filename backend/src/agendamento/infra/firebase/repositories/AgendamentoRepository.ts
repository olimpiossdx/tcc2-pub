import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase, firebaseAdminInstance } from '../../../../config/firebase.config';
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
      Object.assign(agendamento, agendamentoJson[hashkey]);
    }

    return agendamento;
  };

  public async FindSpecificAsync(data: Date, blocoId: string, laboratorioId: string, horarioInicio: Date, horarioFim: Date): Promise<Agendamento | undefined> {
    // TODO: finalizar implementação de acordo com as regra do firebaase
    const dataTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(data);
    const response = await this.agendamentoRepository.orderByChild('data').endAt(dataTimestamp.seconds).get();

    const horarioInicioTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioInicio);
    const horarioFimTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioFim);

    let agendamento: Agendamento | undefined = undefined;

    if (response.exists()) {
      const agendamentoJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(agendamentoJson)[0];
      Object.assign(agendamento, agendamentoJson[hashkey]);
    }

    return agendamento;
  };

  public async UpdateAgendamentoAsync(agendamento: Agendamento): Promise<void> {
    await this.agendamentoRepository.child(agendamento.id).update(agendamento);
  };

  public async CreateAsync(data: Agendamento): Promise<Agendamento> {
    await this.agendamentoRepository.child(data.id).update(data);
    return data;
  };
};

export default BlocosRepository;
