import BaseModel from '../../../../shared/repositories/baseModel';

export class Laboratorio extends BaseModel {
  constructor() {
    super();
    this.created =  Date.now();
    this.updated =  Date.now();
  };

  nome: string;
  numero: number;
};

class Bloco extends BaseModel {
  constructor() {
    super();
    this.created = Date.now();
    this.updated = Date.now();
  };

  nome: string;
  laboratorios: Laboratorio[];
};

export default Bloco;