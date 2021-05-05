import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import Bloco from '../infra/firebase/entities/Bloco';
import IBlocoRepository from '../repositories/IBlocoRepository';



@injectable()
class UpdateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository) { };

  public async execute({ id, nome, laboratorios }: Bloco): Promise<void> {
    const bloco = await this.blocoRepository.FindAsync(id);

    if (!bloco) {
      throw new AppError('Bloco não cadastrado.');
    };

    if (!bloco.laboratorios.length) {
      throw new AppError('Não é possível atualizar bloco sem ao menos ter um laboratório.');
    };

    await this.blocoRepository.UpdateBlocoAsync({ id, nome, laboratorios });
  };
};

export default UpdateBlocoService;