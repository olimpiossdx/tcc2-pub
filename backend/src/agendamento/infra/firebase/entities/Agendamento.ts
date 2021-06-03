import BaseModel from "../../../../shared/repositories/baseModel";

export class Bloco extends BaseModel {
  constructor() {
    super();
  this.created = new Date().getTime();  
  this.updated = new Date().getTime();  
  };
  
  nome: string;
};

export class Laboratorio extends BaseModel {
  constructor() {
    super();
  this.created = new Date().getTime();  
  this.updated = new Date().getTime();  
  };

  nome: string;
  numero: number;
};

class Agendamento extends BaseModel {
  constructor() {
    super();
  this.created = new Date().getTime();  
  this.updated = new Date().getTime();  
  };

  usuarioId: string;
  data: number;
  horarioInicio: number;
  horarioFim: number;

  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;
