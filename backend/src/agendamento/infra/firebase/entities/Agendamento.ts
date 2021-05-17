export class Bloco extends BaseModel{
  id: string;
  nome: string;
};

export class Laboratorio extends BaseModel {
  id: string;
  nome: string;
  numero: number;
};

class Agendamento extends BaseModel {
  id: string;
  horarioInicio: number;
  horarioFim: number;
  data: number;
  
  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;
