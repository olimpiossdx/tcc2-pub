import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IBlocoRepository from '../repositories/IBlocoRepository';
import IAgendamentoRepository from '../../agendamento/repositories/IAgendmanetoRepository';
import IBlocoLaboratorioDisponivelDTO from '../dtos/IBlocoLaboratorioDisponivelDTO';
import AppError from '../../shared/erros';
import IParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/IParametroPeriodoAgendamentoRepository';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';

export interface IResponse {
  blocoId: string;
  laboratorioNome: string;
  data: Date;
  horarioInicio: Date;
  horarioFim: Date
};

@injectable()
class BlocoLaboratorioDisponiveis {
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
    }

    const entities = await this.agendamentoRepository.SearchByPeriodAsync(parametroPeriodoAgendamento[0], blocoId,
      laboratorioId, laboratorio.nome, new Date(data).getTime());

    if (!bloco) {
      throw new AppError('Bloco não encontrado');
    };

    return entities;
  };
};

export default BlocoLaboratorioDisponiveis;