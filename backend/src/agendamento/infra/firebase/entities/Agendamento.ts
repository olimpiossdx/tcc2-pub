import BaseModel from "../../../../shared/repositories/baseModel";

export class Bloco extends BaseModel {
  nome: string;
};

export class Laboratorio extends BaseModel {
  nome: string;
  numero: number;
};

class Agendamento extends BaseModel {
  usuarioId: string;
  horarioInicio: number;
  horarioFim: number;
  data: number;

  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;
