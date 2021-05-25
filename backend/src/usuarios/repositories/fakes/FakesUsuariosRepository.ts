import Agendamento from '../../../agendamento/infra/firebase/entities/Agendamento';
import FakeBaseRepository from '../../../shared/repositories/fakeBaseRepository';
import Usuario from '../../infra/firebase/entities/Usuario';
import IUsuariosRepository from '../IUsuariosRepository';


class FakeUsuariosRepository  extends FakeBaseRepository<Usuario> implements IUsuariosRepository  {
  constructor() {
    super('usuario');
  };
  
  public async AddOrUpdateAgendamentoAsync(id: string, agendamento: Agendamento): Promise<void> {
    const entity = this.contextDatabase.find(usuario => usuario.id === id) as Usuario;
    const agendamentoIndex = entity.agendamentos.findIndex(item => item.id == agendamento.id);

    if (agendamentoIndex === -1) {
      entity.agendamentos.push(agendamento);
    } else {
      entity.agendamentos[agendamentoIndex] = agendamento;
    }
  }

  public async FindByAuthIdAsync(authId: string): Promise<Usuario | undefined> {
    return this.contextDatabase.find(usuario => usuario.id === authId);
  };

  public async IsUnicKeyAsync(acessKey: string): Promise<boolean> {
    const isUsuario = this.contextDatabase.find(usuario => usuario.accessKey === acessKey);

    return !!isUsuario;
  };

  public async FindByEmailAsync(email: string): Promise<Usuario | undefined> {
    return this.contextDatabase.find(usuario => usuario.email === email);
  };
};

export default FakeUsuariosRepository;
