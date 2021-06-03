import Agendamento from "../../../../agendamento/infra/firebase/entities/Agendamento";
import BaseModel from "../../../../shared/repositories/baseModel";

class Usuario extends BaseModel{
  constructor() {
    super();
    this.agendamentos = new Array<Agendamento>();
    this.updated = new Date().getTime();
    this.created = new Date().getTime();
  };
  
  id: string;
  accessKey: string;
  nome: string;
  email: string;
  urlImg: undefined | string;
  agendamentos: Agendamento[];
};

export default Usuario;