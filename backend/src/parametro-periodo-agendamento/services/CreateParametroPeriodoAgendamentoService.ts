import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../repositories/IParametroPeriodoAgendamentoRepository';


@injectable()
class CreateParametroPeriodoAgendamentoService {
  constructor(
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { };

  public async ExecuteAsync({ periodo }: ICreteParametroPeriodoAgendamentoDTO): Promise<ParametroPeriodoAgendamento> {
    const parametroPeriodoAgendamentos = await this.parametroPeriodoAgendamentoRepository.GetAsync<ParametroPeriodoAgendamento>('id');

    if (parametroPeriodoAgendamentos.length) {
      throw new AppError(`Não possível criar parâmetros iguais.`);
    };

    return await this.parametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ id: uuid(), periodo });
  };
};

export default CreateParametroPeriodoAgendamentoService;