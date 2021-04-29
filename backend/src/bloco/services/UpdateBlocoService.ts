import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IBlocoRepository from '../repositories/IBlocoRepository';

interface IRequest {
  id: string;
  accessKey: string;
};

@injectable()
class UpdateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private usuariosRepository: IBlocoRepository) { };

  public async execute({ id, accessKey }: IRequest): Promise<void> {
    //TODO: alterar paras regras de BLOCO
  };
};

export default UpdateBlocoService;