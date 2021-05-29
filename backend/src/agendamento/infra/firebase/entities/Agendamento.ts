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
  data: number;
  horarioInicio: number;
  horarioFim: number;

  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;
