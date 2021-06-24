import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IBlocoRepository from '../repositories/IBlocoRepository';
import IAgendamentoRepository from '../../agendamento/repositories/IAgendmanetoRepository';
import IBlocoLaboratorioDisponivelDTO from '../dtos/IBlocoLaboratorioDisponivelDTO';
import AppError from '../../shared/erros';
import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import { differenceInMinutes, isSameDay } from 'date-fns';

export interface IResponse {
  blocoId: string;
  laboratorioId: string;
  laboratorioNome: string;
  data: Date;
  horarioInicio: Date;
  horarioFim: Date
};

@injectable()
class BlocoLaboratorioDisponiveisService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository,
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository,
    @inject('ParametroPeriodoAgendamentoRepository')
    private parametroPeriodoAgendamentoRepository: IParametroPeriodoAgendamentoRepository) { }
  public async ExecuteAsync({ blocoId, laboratorioId, data }: IBlocoLaboratorioDisponivelDTO): Promise<IResponse[]> {
    const bloco = await this.blocoRepository.FindByIdAsync(blocoId);
    const parametroPeriodoAgendamento = await this.parametroPeriodoAgendamentoRepository.GetAsync<ParametroPeriodoAgendamento>('id');

    if (!parametroPeriodoAgendamento) {
      throw new AppError('Não é possível listar os horaríos disponíveis sem parâmetro');
    }

    if (!bloco) {
      throw new AppError('Não é possível listar os horaríos disponíveis sem bloco');
    };

    const laboratorio = bloco.laboratorios.find(laboratorio => laboratorio.id === laboratorioId);

    if (!laboratorio) {
      throw new AppError('Não é possível listar os horaríos disponíveis para laboratório não cadastrado');
    };

    const agendamentos = await this.agendamentoRepository.SearchByPeriodAsync(parametroPeriodoAgendamento[0], blocoId,
      laboratorioId, laboratorio.nome, new Date(data).getTime());

    const periodo = parametroPeriodoAgendamento[0].periodo;
    const parsedHorarioInicio = new Date(parametroPeriodoAgendamento[0].horarioInicio);
    const parsedHorarioFim = new Date(parametroPeriodoAgendamento[0].horarioFim);
    const todayEnd = new Date(data);
    const todayStart = new Date(data);
    let currentDate = new Date(data);

    todayStart.setHours(parsedHorarioInicio.getHours());
    todayStart.setMinutes(parsedHorarioInicio.getMinutes());

    todayEnd.setHours(parsedHorarioFim.getHours());
    todayEnd.setMinutes(parsedHorarioFim.getMinutes());

    if (!isSameDay(currentDate, new Date())) {
      currentDate.setHours(parsedHorarioInicio.getHours());
      currentDate.setMinutes(parsedHorarioInicio.getMinutes());
    };


    const entities = new Array<IResponse>();

    for (let time = currentDate; time >= todayStart && time <= todayEnd; time.setMinutes(time.getMinutes() + periodo)) {
      const agendamento = agendamentos.find(agendamento => time.getTime() >= agendamento.horarioInicio && time.getTime() <= agendamento.horarioFim);

      if (!agendamento) {
        const horarioInicio = new Date(time);
        const horarioFim = new Date(time);
        horarioFim.setMinutes(horarioFim.getMinutes() + periodo);

        if (horarioFim.getHours() === todayEnd.getHours() && horarioFim.getMinutes() > todayEnd.getMinutes()) {
          horarioFim.setHours(todayEnd.getHours());
          horarioFim.setMinutes(todayEnd.getMinutes());
        };

        if (horarioFim <= todayEnd) {
          entities.push({ blocoId, laboratorioId: laboratorio.id, laboratorioNome: laboratorio.nome, data: new Date(data), horarioInicio, horarioFim })
        }
      }
    };

    return entities;
  };
};

export default BlocoLaboratorioDisponiveisService;