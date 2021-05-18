import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import ParametroPeriodoAgendamento from '../../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../IParametroPeriodoAgendamentoRepository';

class FakeParametroPeriodoAgendamentoRepository extends FakeBaseRepository<ParametroPeriodoAgendamento> implements IParametroPeriodoAgendamentoRepository {
  constructor() {
    super('parametroPeriodoAgendamento');
  };
};

export default FakeParametroPeriodoAgendamentoRepository;
