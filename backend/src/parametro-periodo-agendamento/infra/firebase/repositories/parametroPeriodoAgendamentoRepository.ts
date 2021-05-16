import BaseRepository from '../../../../shared/repositories/baseRepository';
import IParametroPeriodoAgendamentoRepository from '../../../repositories/IParametroPeriodoAgendamentoRepository';

export interface objecToArray {
  [key: string]: any;
};

class ParametroPeriodoAgendamentoRepository extends BaseRepository implements IParametroPeriodoAgendamentoRepository {
  constructor() {
    super('parametroPeriodoAgendamento');
  };
};

export default ParametroPeriodoAgendamentoRepository;
