import BaseModel from "../../../../shared/repositories/baseModel";

class ParametroPeriodoAgendamento extends BaseModel {
  constructor() {
    super();
    this.created = new Date().getTime();
    this.updated = new Date().getTime();
  };

  id: string;
  periodo: number;
  horaInicio: number;
  horaFim: number;
};

export default ParametroPeriodoAgendamento;