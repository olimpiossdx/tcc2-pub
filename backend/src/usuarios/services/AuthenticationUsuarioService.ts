import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '../../shared/erros';
import IAuthenticationUsarioDTO from '../dtos/IAuthenticationUsarioDTO';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class AuthenticationUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async ExecuteAsync({ email }: IAuthenticationUsarioDTO): Promise<string> {
    const usuario = await this.usuariosRepository.FindByEmailAsync(email);

    if (!usuario) {
      throw new AppError('Usuário não cadastrado.');
    };

    return usuario.accessKey;
  };
};

export default AuthenticationUsuarioService;