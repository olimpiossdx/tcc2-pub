import 'reflect-metadata';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento from '../infra/firebase/entities/Agendamento';
import IBlocoRepository from '../repositories/IAgendmanetoRepository';


@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IBlocoRepository) { };

  public async ExecuteAsync({ bloco, laboratorio, data, horarioInicio, horarioFim }: ICreteAgendamentoDTO): Promise<Agendamento> {
    // TODO: alterar para parâmetro de período mínimo de agendamento
    const agendamento = await this.agendamentoRepository.FindSpecificAsync(data, bloco.id, laboratorio.id, horarioInicio, horarioFim);
    const periodoMinimoAgendamento = 30;

    if (agendamento) {
      throw new AppError(`Não possível agendar, existe um agendamento em ${agendamento.data} no período ${agendamento.horarioInicio} - ${agendamento.horarioFim}.`);
    };

    if (differenceInMinutes(horarioFim, horarioInicio) < periodoMinimoAgendamento) {
      throw new AppError(`O período mínimo para agendamento é ${periodoMinimoAgendamento} minutos.`);
    };
      
    return await this.agendamentoRepository.CreateOrUpdateAsync({ id: uuid(), bloco, laboratorio, data: data, horarioInicio: horarioInicio, horarioFim: horarioFim });
  };
};

export default CreateAgendamentoService;