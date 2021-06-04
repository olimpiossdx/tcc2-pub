import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IUpdateParametroPeriodoAgendamentoDTO from '../dtos/IUpdateParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../repositories/IParametroPeriodoAgendamentoRepository';

@injectable()
class UpdateParametroPeriodoAgendamentoService {
  constructor(
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { };

  public async ExecuteAsync({ id, periodo, horarioInicio, horarioFim }: IUpdateParametroPeriodoAgendamentoDTO): Promise<ParametroPeriodoAgendamento> {
    const parametroPeriodoAgendamento = await this.parametroPeriodoAgendamentoRepository.GetByIdAsync<ParametroPeriodoAgendamento>(id);

    if (!parametroPeriodoAgendamento) {
      throw new AppError('Não é possível atualizar');
    };

    return await this.parametroPeriodoAgendamentoRepository.CreateOrUpdateAsync<ParametroPeriodoAgendamento>({
      created: parametroPeriodoAgendamento.created, updated: Date.now(),
      id, periodo, horarioInicio: horarioInicio.getTime(), horarioFim: horarioFim.getTime()
    });
  };
};

export default UpdateParametroPeriodoAgendamentoService;
