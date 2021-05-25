import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import Agendamento from '../../agendamento/infra/firebase/entities/Agendamento';
import AppError from '../../shared/erros';
import Usuario from '../infra/firebase/entities/Usuario';
import IUsuariosRepository from '../repositories/IUsuariosRepository';

@injectable()
class UsuarioAgendamentoService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { };

  public async ExecuteAsync(id: string): Promise<Agendamento[]> {
    const entity = await this.usuariosRepository.GetByIdAsync<Usuario>(id);

    if (!entity) {
      throw new AppError('Usuário não cadastrado.');
    };

    return entity.agendamentos;
  };
};

export default UsuarioAgendamentoService;
