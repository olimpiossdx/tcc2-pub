import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';
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
    const existeUsuario = await this.usuariosRepository.FindByEmailAsync(email);

    if (existeUsuario) {
      throw new AppError('Usuário já cadastrado.');
    };

    const isUnicKey = await this.usuariosRepository.IsUnicKeyAsync(accessKey);

    if (isUnicKey) {
      throw new AppError('Chave de acesso ja cadastrada.');
    };

    return await this.usuariosRepository.CreateOrUpdateAsync<Usuario>({ id, nome, email, accessKey, urlImg, agendamentos: [] });
  };
};

export default CreateUsuarioService;
