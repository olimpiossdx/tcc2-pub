import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../repositories/IParametroPeriodoAgendamentoRepository';

@injectable()
class UpdateParametroPeriodoAgendamentoService {
  constructor(
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { };

  public async ExecuteAsync({ id, periodo }: ParametroPeriodoAgendamento): Promise<ParametroPeriodoAgendamento> {
    const parametroPeriodoAgendamento = await this.parametroPeriodoAgendamentoRepository.GetByIdAsync<ParametroPeriodoAgendamento>(id);

    if (!parametroPeriodoAgendamento) {
      throw new AppError("Não é possível atualizar");
    };

    return await this.parametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ id, periodo });
  };
};

export default UpdateParametroPeriodoAgendamentoService;
