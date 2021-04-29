import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IUsuariosRepository from '../repositories/IBlocoRepository';

//TODO: alterar paras regras de BLOCO
interface IRequest {
  id: string;
  accessKey: string;
};

@injectable()
class UpdateBlocoService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async execute({ id, accessKey }: IRequest): Promise<void> {
    const existeUsuario = await this.usuariosRepository.FindByAuthIdAsync(id);

    if (!existeUsuario) {
      throw new AppError('Usuário não cadastrado.');
    };

    await this.usuariosRepository.UpdateAccessKeyAsync( id, accessKey );
  };
};

export default UpdateBlocoService;