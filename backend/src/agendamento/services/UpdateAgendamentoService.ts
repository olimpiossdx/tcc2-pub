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

  public async execute({ id, bloco, laboratorio, data, horarioInicio, horarioFim }: Agendamento): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.FindSpecificAsync(data, bloco.id, laboratorio.Id, horarioInicio, horarioFim);
    
    if(agendamento){
      new throw AppError("Não é possível ataualizar, já existe um agendamento.");
    };
    
    return await this.blocoRepository.UpdateAgendamentoAsync({ id, bloco, laboratorio, data, horarioInicio, horarioFim });
  };
};

export default UpdateBlocoService;
