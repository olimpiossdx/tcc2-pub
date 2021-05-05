import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import Bloco from '../infra/firebase/entities/Bloco';
import IBlocoRepository from '../repositories/IBlocoRepository';


@injectable()
class CreateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository) { };

  public async ExecuteAsync({ id, nome, laboratorios }: Bloco): Promise<void> {
    const bloco = await this.blocoRepository.FindAsync(id);

    if (bloco) {
      throw new AppError('Bloco já cadastrado.');
    };

    if (!laboratorios.length) {
      throw new AppError('Bloco deve conter ao menos um laboratório.');
    }

    await this.blocoRepository.CreateAsync({ id, nome, laboratorios });
  };
};

export default CreateBlocoService;