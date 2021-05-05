import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import Agendamento from '../infra/firebase/entities/Agendamento';
import Bloco from '../infra/firebase/entities/Agendamento';
import IBlocoRepository from '../repositories/IAgendmanetoRepository';



@injectable()
class UpdateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository) { };

  public async execute({ id, bloco, laboratorio, data, horarioInicio, horarioFim }: Agendamento): Promise<void> {
    const agendamento = await this.blocoRepository.FindAsync(id);

    await this.blocoRepository.UpdateBlocoAsync({ id, nome, laboratorios });
  };
};

export default UpdateBlocoService;