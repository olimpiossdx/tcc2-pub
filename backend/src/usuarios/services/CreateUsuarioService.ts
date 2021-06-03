import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import ICreateUsuarioDTO from '../dtos/ICreateUsuarioDTO';
import Usuario from '../infra/firebase/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async ExecuteAsync({ id, nome, email, accessKey, urlImg }: ICreateUsuarioDTO): Promise<Usuario> {
    let entity = await this.usuariosRepository.FindByEmailAsync(email);

    if (entity) {
      throw new AppError('Usuário já cadastrado.');
    };

    const isUnicKey = await this.usuariosRepository.IsUnicKeyAsync(accessKey);

    if (isUnicKey) {
      throw new AppError('Chave de acesso ja cadastrada.');
    };

    entity = Object.assign({ id, nome, email, accessKey, urlImg }, new Usuario());

    return await this.usuariosRepository.CreateOrUpdateAsync<Usuario>(entity);
  };
};

export default CreateUsuarioService;
