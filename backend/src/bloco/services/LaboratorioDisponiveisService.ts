import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IBlocoRepository from '../repositories/IBlocoRepository';
import IAgendamentoRepository from '../../agendamento/repositories/IAgendmanetoRepository';
import IBlocoLaboratorioDisponivelDTO from '../dtos/IBlocoLaboratorioDisponivelDTO';
import AppError from '../../shared/erros';
import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import Agendamento from '../../agendamento/infra/firebase/entities/Agendamento';
import { isEqual } from 'date-fns';

export interface IResponse {
  blocoId: string;
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
    @inject('AgendamentoRepository')
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
    const todayEnd = new Date();
    const todayStart = new Date();

    todayStart.setHours(parsedHorarioInicio.getHours());
    todayStart.setMinutes(parsedHorarioInicio.getMinutes());

    todayEnd.setHours(parsedHorarioFim.getHours());
    todayEnd.setMinutes(parsedHorarioFim.getMinutes());


    const entities = new Array<IResponse>();

    for (let time = new Date(); time >= todayStart && time <= todayEnd; time.setMinutes(time.getMinutes() + periodo)) {
      const agendamento = agendamentos.find(agendamento => time.getTime() >= agendamento.horarioInicio && time.getTime() <= agendamento.horarioFim);

      if (!agendamento) {
        const horarioFim = new Date(time);
        horarioFim.setMinutes(horarioFim.getMinutes() + periodo);

        entities.push({ blocoId, laboratorioNome: laboratorio.nome, data: new Date(data), horarioInicio: time, horarioFim })
      }
    };

    return entities;
  };
};

export default BlocoLaboratorioDisponiveisService;