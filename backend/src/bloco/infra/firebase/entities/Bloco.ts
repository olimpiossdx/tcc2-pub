import BaseModel from "../../../../shared/repositories/baseModel";

export class Laboratorio extends BaseModel {
  constructor() {
    super();
    this.created = new Date().getTime();
    this.updated = new Date().getTime();
  };

  nome: string;
  numero: number;
};

class Bloco extends BaseModel {
  constructor() {
    super();
    this.created = new Date().getTime();
    this.updated = new Date().getTime();
  };
  
  nome: string;
  laboratorios: Laboratorio[];
};

export default Bloco;