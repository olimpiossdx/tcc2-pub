import Agendamento from '../../../../agendamento/infra/firebase/entities/Agendamento';
import BaseRepository from '../../../../shared/repositories/baseRepository';
import ICreateUsuarioDTO from '../../../dtos/ICreateUsuarioDTO';
import IUsuariosRepository from '../../../repositories/IUsuariosRepository';
import Usuario from '../entities/Usuario';

export interface objecToArray {
  [key: string]: any;
};

class UsuariosRepository extends BaseRepository implements IUsuariosRepository {
  constructor() {
    super('usuario');
  };

  public async AddOrUpdateAgendamentoAsync(id: string, agendamento: Agendamento): Promise<void> {
    const response = await this.contextDatabaseRef.equalTo(id).get();
    let entity: Usuario | undefined = new Usuario();

    const usuarioJson = response.toJSON() as objecToArray;
    const hashkey = Object.keys(usuarioJson)[0];
    Object.assign(entity, usuarioJson[hashkey])
    const entityAgendamentoIndex = entity.agendamentos.findIndex(item => item.id == agendamento.id);

    if (entityAgendamentoIndex == -1) {
      entity.agendamentos.push(agendamento);
    } else {
      entity.agendamentos[entityAgendamentoIndex] = agendamento;
    };

    await this.contextDatabaseRef.child(entity.id).update(entity);
  };

  public async IsUnicKeyAsync(acessKey: string): Promise<boolean> {
    const response = await this.contextDatabaseRef.orderByChild('acessKey').equalTo(acessKey).get();

    return response.exists();
  }

  public async FindByAuthIdAsync(authId: string): Promise<Usuario | undefined> {
    const response = await this.contextDatabaseRef.orderByChild('id').equalTo(authId).get();
    let usuario: Usuario | undefined = new Usuario();

    if (response.exists()) {
      const usuarioJson = response.toJSON() as objecToArray;

      const hashkey = Object.keys(usuarioJson)[0];
      Object.assign(usuario, usuarioJson[hashkey]);

    } else {
      usuario = undefined;
    };

    return usuario;
  };

  public async FindByEmailAsync(email: string): Promise<Usuario> {
    const response = await this.contextDatabaseRef.orderByChild('email').equalTo(email).get();
    let usuario: Usuario | null = new Usuario();

    const usuarioJson = response.toJSON() as objecToArray;
    const hashkey = Object.keys(usuarioJson)[0];
    Object.assign(usuario, usuarioJson[hashkey]);

    return usuario;
  };

  public async CreateAsync(data: Usuario): Promise<void> {
    await this.contextDatabaseRef.child(data.id).update(data);
  };

  public async UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void> {
    const usuario = await this.FindByAuthIdAsync(id) as Usuario;
    usuario.accessKey = accessKey;

    await this.contextDatabaseRef.child(usuario.id).update(usuario);
  };
};

export default UsuariosRepository;
