import { firebaseAdminInstance } from '../../../../config/firebase.config';
import IAgendamentoRepository from '../../../repositories/IAgendmanetoRepository';
import Agendamento from '../entities/Agendamento';

import BaseRepository from '../../../../shared/repositories/baseRepository';

export interface objecToArray {
  [key: string]: any;
};

class BlocosRepository extends BaseRepository implements IAgendamentoRepository {
  constructor() {
    super('agendamentos');
  };

  public async FindSpecificAsync(data: Date, blocoId: string, laboratorioId: string, horarioInicio: Date, horarioFim: Date): Promise<Agendamento | undefined> {
    // TODO: finalizar implementação de acordo com as regra do firebaase
    const dataTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(data);
    const response = await this.contextDatabaseRef.orderByChild('data').endAt(dataTimestamp.seconds).get();

    if (!response.exists()) {
      return undefined;
    };

    const horarioInicioTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioInicio);
    const horarioFimTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioFim);

    const agendamento = new Agendamento();
    const agendamentoJson = response.toJSON() as objecToArray;

    const hashkey = Object.keys(agendamentoJson)[0];
    Object.assign(agendamento, agendamentoJson[hashkey]);

    return agendamento;
  };
};

export default BlocosRepository;
