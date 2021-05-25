import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class UsuarioAgendamentoService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async ExecuteAsync(id:string): Promise<void> {
    const entity = await this.usuariosRepository.GetByIdAsync(id);
    return entity.agendamentos;
  };
};

export default UsuarioAgendamentoService;
