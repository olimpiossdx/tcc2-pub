import Agendamento from "../../../../agendamento/infra/firebase/entities/Agendamento";

class Usuario {
  id: string;
  accessKey: string;
  nome: string;
  email: string;
  urlImg: undefined | string;
  agendamentos: Agendamento[];
};

export default Usuario;