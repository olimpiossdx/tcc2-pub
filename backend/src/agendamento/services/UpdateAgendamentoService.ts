import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import Agendamento from '../infra/firebase/entities/Agendamento';
import IAgendamentoRepository from '../repositories/IAgendmanetoRepository';



@injectable()
class UpdateAgendamentoService {
  constructor(
    @inject('AgendamentoRepository')
    private agendamentoRepository: IAgendamentoRepository) { };

  public async ExecuteAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim }: Agendamento): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.FindSpecificAsync(data, bloco.id, laboratorio.id, horarioInicio, horarioFim);

    if (agendamento) {
      throw new AppError("Não é possível atualizar, já existe um agendamento.");
    };

    return await this.agendamentoRepository.CreateOrUpdateAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim });
  };
};

export default UpdateAgendamentoService;
