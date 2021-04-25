import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

interface IRequest {
  id: string;
  accessKey: string;
};

@injectable()
class UpdateUsuarioAccessKeyService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { }

  public async execute({ id, accessKey }: IRequest): Promise<void> {
    const existeUsuario = await this.usuariosRepository.findByAuthId(id);

    if (!existeUsuario) {
      throw new AppError('Usuário não cadastrado.');
    }

    await this.usuariosRepository.updateAccessKey( id, accessKey );
  }
}

export default UpdateUsuarioAccessKeyService;