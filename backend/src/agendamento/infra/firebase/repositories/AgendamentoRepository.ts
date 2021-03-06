import { firebaseAdminInstance } from '../../../../config/firebase.config';
import IAgendamentoRepository from '../../../repositories/IAgendmanetoRepository';
import Agendamento from '../entities/Agendamento';

import BaseRepository from '../../../../shared/repositories/baseRepository';
import { isEqual } from 'date-fns';
import ParametroPeriodoAgendamento from '../../../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import { IResponse } from '../../../../bloco/services/LaboratorioDisponiveisService';

export interface objecToArray {
  [key: string]: any;
};

class AgendamentoRepository extends BaseRepository implements IAgendamentoRepository {
  constructor() {
    super('agendamentos');
  };

  public async FindSpecificAsync(data: number, blocoId: string, laboratorioId: string, horarioInicio: number, horarioFim: number): Promise<Agendamento | undefined> {
    // TODO: finalizar implementação de acordo com as regra do firebaase
    // const dataTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(data);
    // const horarioInicioTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioInicio);
    // const horarioFimTimestamp = firebaseAdminInstance.firestore.Timestamp.fromDate(horarioFim);
    const response = await this.contextDatabaseRef.orderByChild('data').endAt(data).get();
    let entities = new Array<Agendamento>();

    if (!response.exists()) {
      return undefined;
    };

    const entitiesJson = response.val() as objecToArray;

    entities = Object.entries(entitiesJson).map(([prop, value], index) => {
      return (entities[index] = {
        ...value,
        data: new Date(value.horarioFim).getTime(),
        horarioInicio: new Date(value.horarioFim).getTime(),
        horarioFim: new Date(value.horarioFim).getTime(),
      } as Agendamento);
    });

    const entity = entities.find(agendamento => {
      return (agendamento.bloco.id === blocoId && agendamento.laboratorio.id == laboratorioId && isEqual(agendamento.data, data) &&
        isEqual(agendamento.horarioInicio, horarioInicio) && isEqual(agendamento.horarioFim, horarioFim));
    });

    return entity;
  };

  public async SearchByPeriodAsync(parametroPeriodoAgendamento: ParametroPeriodoAgendamento, blocoId: string, laboratorioId: string, laboratorioNome: string, data: number): Promise<Agendamento[]> {
    let entities = new Array<Agendamento>();
    const response = await this.contextDatabaseRef.orderByChild('data').equalTo(data).get();

    if (!response.exists()) {
      return entities;
    };

    entities = Object.entries(response.val() as objecToArray).map(([prop, value], index) => {
      return (entities[index] = {
        ...value,
        data: new Date(value.horarioFim).getTime(),
        horarioInicio: new Date(value.horarioFim).getTime(),
        horarioFim: new Date(value.horarioFim).getTime(),
      } as Agendamento);
    });

    return entities.filter(agendamento => agendamento.bloco.id === blocoId && agendamento.laboratorio.id === laboratorioId);
  };
};

export default AgendamentoRepository;
