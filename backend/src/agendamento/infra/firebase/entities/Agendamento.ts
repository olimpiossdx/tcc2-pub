import BaseModel from '../../../../shared/repositories/baseModel';

export class Bloco extends BaseModel {
  constructor() {
    super();
  this.created = Date.now();  
  this.updated = Date.now();  
  };
  
  nome: string;
};

export class Laboratorio extends BaseModel {
  constructor() {
    super();
  this.created = Date.now();  
  this.updated = Date.now();  
  };

  nome: string;
  numero: number;
};

class Agendamento extends BaseModel {
  constructor() {
    super();
  this.created = Date.now();  
  this.updated = Date.now();  
  };

  usuarioId: string;
  data: number;
  horarioInicio: number;
  horarioFim: number;

  bloco: Bloco;
  laboratorio: Laboratorio;
};

export default Agendamento;
