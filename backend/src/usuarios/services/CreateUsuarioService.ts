import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import ICreteUsuarioDTO from '../dtos/ICreteUsuarioDTO';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { }

  public async ExecuteAsync({ id, nome, email, accessKey, urlImg }: ICreteUsuarioDTO): Promise<void> {
    const existeUsuario = await this.usuariosRepository.FindByAuthIdAsync(id);

    if (existeUsuario) {
      throw new AppError('Usuário já cadastrado.');
    }

    const isUnicKey = await this.usuariosRepository.IsUnicKeyAsync(accessKey);

    if (isUnicKey) {
      throw new AppError('Chave de acesso ja cadastrada.');
    }

    await this.usuariosRepository.CreateAsync({ id, nome, email, accessKey, urlImg });
  }
}

export default CreateUsuarioService;