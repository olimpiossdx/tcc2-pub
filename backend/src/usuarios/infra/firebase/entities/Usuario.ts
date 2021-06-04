import Agendamento from '../../../../agendamento/infra/firebase/entities/Agendamento';
import BaseModel from '../../../../shared/repositories/baseModel';

class Usuario extends BaseModel {
  constructor() {
    super();
    this.agendamentos = new Array<Agendamento>();
    this.updated = Date.now();
    this.created = Date.now();
  };

  id: string;
  accessKey: string;
  nome: string;
  email: string;
  urlImg: undefined | string;
  agendamentos: undefined | Agendamento[];
};

export default Usuario;