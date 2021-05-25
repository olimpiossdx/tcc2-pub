import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import IUpdateUsuarioDTO from '../dtos/IUpdateUsuarioDTO';
import Usuario from '../infra/firebase/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class UpdateUsuarioAccessKeyService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async execute({ id, accessKey }: IUpdateUsuarioDTO): Promise<Usuario> {
    const entity = await this.usuariosRepository.FindByAuthIdAsync(id);

    if (!entity) {
      throw new AppError('Usuário não cadastrado.');
    };
    
    entity.accessKey = accessKey;
    return await this.usuariosRepository.CreateOrUpdateAsync(entity);
  };
};

export default UpdateUsuarioAccessKeyService;
