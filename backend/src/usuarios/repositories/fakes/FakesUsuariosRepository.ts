import Agendamento from '../../../agendamento/infra/firebase/entities/Agendamento';
import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import ICreteUsuarioDTO from '../../dtos/ICreteUsuarioDTO';
import Usuario from '../../infra/firebase/entities/Usuario';
import IUsuariosRepository from '../IUsuariosRepository';


class FakeUsuariosRepository  extends FakeBaseRepository<Usuario> implements IUsuariosRepository  {
  private usuarios: Usuario[] = [];  
  constructor() {
    super('usuario');
  };
  
  public async AddOrUpdateAgendamentoAsync(id: string, agendamento: Agendamento): Promise<void> {
    const entity = this.usuarios.find(usuario => usuario.id === id) as Usuario;
    const agendamentoIndex = entity.agendamentos.findIndex(item => item.id == agendamento.id);

    if (agendamentoIndex === -1) {
      entity.agendamentos.push(agendamento);
    } else {
      entity.agendamentos[agendamentoIndex] = agendamento;
    }
  }

  public async FindByAuthIdAsync(authId: string): Promise<Usuario | undefined> {
    const isUsuario = this.usuarios.find(usuario => usuario.id === authId);

    return isUsuario;
  };

  public async IsUnicKeyAsync(acessKey: string): Promise<boolean> {
    const isUsuario = this.usuarios.find(usuario => usuario.accessKey === acessKey);

    return !!isUsuario;
  };

  public async FindByEmailAsync(email: string): Promise<Usuario | undefined> {
    return this.usuarios.find(usuario => usuario.email === email);
  };
};

export default FakeUsuariosRepository;
