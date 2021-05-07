import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento from '../infra/firebase/entities/Agendamento';
import Bloco from '../infra/firebase/entities/Agendamento';
import IBlocoRepository from '../repositories/IAgendmanetoRepository';


@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IBlocoRepository) { };

  public async ExecuteAsync({ bloco, laboratorio, data, horarioInicio, horarioFim }: ICreteAgendamentoDTO): Promise<Agendamento> {
    // TODO: alterar regra para agendamento
    const agendamento = await this.agendamentoRepository.GetAsync();

    if (!agendamento) {
      throw new AppError("Não possível");
    }

    return await this.agendamentoRepository.CreateAsync({ id: uuid(), bloco, laboratorio, data, horarioFim, horarioInicio });
  };
};

export default CreateAgendamentoService;