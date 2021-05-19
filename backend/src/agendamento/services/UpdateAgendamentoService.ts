import { differenceInMinutes } from 'date-fns';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import AppError from '../../shared/erros';
import Agendamento from '../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../repositories/IAgendmanetoRepository';



@injectable()
class UpdateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { };

  public async ExecuteAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim }: Agendamento): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.FindSpecificAsync(data, bloco.id, laboratorio.id, horarioInicio, horarioFim);
    const periodoMinimoAgendamentos = await this.parametroPeriodoAgendamentoRepository.GetAsync<ParametroPeriodoAgendamento>('periodo');

    if (!periodoMinimoAgendamentos.length) {
      throw new AppError(`Não possível atualizar agendamento sem parâmetro de período.`);
    };
    
    if (differenceInMinutes(horarioFim, horarioInicio) < periodoMinimoAgendamentos[0].periodo) {
      throw new AppError(`O período mínimo para agendamento é ${periodoMinimoAgendamentos[0].periodo} minutos.`);
    };

    if (agendamento) {
      throw new AppError("Não é possível atualizar, já existe um agendamento.");
    };

    return await this.agendamentoRepository.CreateOrUpdateAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim, created: new Date().getTime(), updated: new Date().getTime() });
  };
};

export default UpdateAgendamentoService;
