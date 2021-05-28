import 'reflect-metadata';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento from '../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../repositories/IAgendmanetoRepository';
import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import IUsuariosRepository from '../../usuarios/repositories/IUsuariosRepository';


@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository,
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async ExecuteAsync({ usuarioId, bloco, laboratorio, data, horarioInicio, horarioFim }: ICreteAgendamentoDTO): Promise<Agendamento> {
    let entity = await this.agendamentoRepository.FindSpecificAsync(data, bloco.id, laboratorio.id, horarioInicio, horarioFim);
    const periodoMinimoAgendamentos = await this.parametroPeriodoAgendamentoRepository.GetAsync<ParametroPeriodoAgendamento>('periodo');

    if (!periodoMinimoAgendamentos.length) {
      throw new AppError(`Não possível criar agendamento sem parâmetro de período.`);
    };

    if (entity) {
      throw new AppError(`Não possível agendar, existe um agendamento em ${entity.data} no período ${entity.horarioInicio} - ${entity.horarioFim}.`);
    };

    if (differenceInMinutes(horarioFim, horarioInicio) < periodoMinimoAgendamentos[0].periodo) {
      throw new AppError(`O período mínimo para agendamento é ${periodoMinimoAgendamentos[0].periodo} minutos.`);
    };

    entity = await this.agendamentoRepository.CreateOrUpdateAsync({
      id: uuid(), usuarioId, bloco, laboratorio, data: data, horarioInicio: horarioInicio, horarioFim: horarioFim,
      created: new Date().getTime(), updated: new Date().getTime()
    });

    await this.usuariosRepository.AddOrUpdateAgendamentoAsync(usuarioId, entity);

    return entity;
  };
};

export default CreateAgendamentoService;