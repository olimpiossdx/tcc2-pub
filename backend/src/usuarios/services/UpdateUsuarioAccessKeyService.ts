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
    private usuariosRepository: IUsuariosRepository) { };

  public async execute({ id, accessKey }: IRequest): Promise<void> {
    const entity = await this.usuariosRepository.FindByAuthIdAsync(id);

    if (!entity) {
      throw new AppError('Usuário não cadastrado.');
    };
    
    entity.acessKey = accessKey;
    await this.usuariosRepository.CreateOrUpdateAsync(id,entity);
  };
};

export default UpdateUsuarioAccessKeyService;
