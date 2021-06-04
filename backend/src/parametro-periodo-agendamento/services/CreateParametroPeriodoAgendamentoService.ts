import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../repositories/IParametroPeriodoAgendamentoRepository';


@injectable()
class CreateParametroPeriodoAgendamentoService {
  constructor(
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { };

  public async ExecuteAsync({ periodo, horarioInicio, horarioFim }: ICreteParametroPeriodoAgendamentoDTO): Promise<ParametroPeriodoAgendamento> {
    const parametroPeriodoAgendamentos = await this.parametroPeriodoAgendamentoRepository.GetAsync<ParametroPeriodoAgendamento>('id');

    if (parametroPeriodoAgendamentos.length) {
      throw new AppError(`Não possível criar parâmetros iguais.`);
    };

    return await this.parametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({
      created: Date.now(), updated: Date.now(),
      id: uuidv4(), periodo, horarioInicio: horarioInicio.getTime(), horarioFim: horarioFim.getTime()
    });
  };
};

export default CreateParametroPeriodoAgendamentoService;