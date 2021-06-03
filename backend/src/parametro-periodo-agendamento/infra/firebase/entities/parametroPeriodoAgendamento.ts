import BaseModel from "../../../../shared/repositories/baseModel";

class ParametroPeriodoAgendamento extends BaseModel {
  constructor() {
    super();
    this.created = new Date().getTime();
    this.updated = new Date().getTime();
  };

  id: string;
  periodo: number;
  horarioInicio: number;
  horarioFim: number;
};

export default ParametroPeriodoAgendamento;