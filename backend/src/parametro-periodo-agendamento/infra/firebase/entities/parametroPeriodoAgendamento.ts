import BaseModel from '../../../../shared/repositories/baseModel';

class ParametroPeriodoAgendamento extends BaseModel {
  constructor() {
    super();
    this.created = Date.now();
    this.updated = Date.now();
  };

  id: string;
  periodo: number;
  horarioInicio: number;
  horarioFim: number;
};

export default ParametroPeriodoAgendamento;