import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import Agendamento from '../infra/firebase/entities/Agendamento';
import Bloco from '../infra/firebase/entities/Agendamento';
import IBlocoRepository from '../repositories/IAgendmanetoRepository';


@injectable()
class CreateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IBlocoRepository) { };

  public async ExecuteAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim }: Agendamento): Promise<void> {
    // TODO: alterar regra para agendamento
    const agendamento = await this.agendamentoRepository.FindAsync(id);

    await this.agendamentoRepository.CreateAsync({ id, nome, laboratorios });
  };
};

export default CreateAgendamentoService;