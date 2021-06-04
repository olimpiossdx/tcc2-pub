import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IUpdateBlocoDTO from '../dtos/IUpdateBlocoDTO';
import Bloco from '../infra/firebase/entities/Bloco';
import IBlocoRepository from '../repositories/IBlocoRepository';

@injectable()
class UpdateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository) { };

  public async execute({ id, nome, laboratorios }: IUpdateBlocoDTO): Promise<void> {
    const bloco = await this.blocoRepository.FindByIdAsync(id);

    if (!bloco) {
      throw new AppError('Bloco não cadastrado.');
    };

    if (!laboratorios.length) {
      throw new AppError('Não é possível atualizar bloco sem ao menos ter um laboratório.');
    };

    const updateBloco ={
      ...bloco,
      updated: Date.now(),
      nome,
      laboratorios: laboratorios
    } as Bloco;

    await this.blocoRepository.CreateOrUpdateAsync<Bloco>(updateBloco);
  };
};

export default UpdateBlocoService;