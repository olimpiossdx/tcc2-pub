import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../../config/firebase.config';
import ICreteUsuarioDTO from '../../../dtos/ICreteUsuarioDTO';
import IUsuariosRepository from '../../../repositories/IUsuariosRepository';
import Usuario from '../entities/Usuario';

export interface objecToArray {
  [key: string]: any;
};

class UsuariosRepository implements IUsuariosRepository {
  private usariosRepository: database.Reference;
  constructor() {
    this.usariosRepository = firebaseDatabase.ref('usuarios');
  };

  public async IsUnicKeyAsync(acessKey: string): Promise<boolean> {
    const response = await this.usariosRepository.orderByChild('acessKey').equalTo(acessKey).get();
    
    return response.exists();
  }

  public async FindByAuthIdAsync(authId: string): Promise<Usuario | undefined> {
    const response = await this.usariosRepository.orderByChild('id').equalTo(authId).get();
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
    const response = await this.usariosRepository.orderByChild('email').equalTo(email).get();
    let usuario: Usuario | null = new Usuario();

    const usuarioJson = response.toJSON() as objecToArray;
    const hashkey = Object.keys(usuarioJson)[0];
    Object.assign(usuario, usuarioJson[hashkey]);

    return usuario;
  };

  public async CreateAsync(data: ICreteUsuarioDTO): Promise<void> {
    await this.usariosRepository.child(data.id).update(data);
  };

  public async UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void> {
    const usuario = await this.FindByAuthIdAsync(id) as Usuario;
    usuario.accessKey = accessKey;

    await this.usariosRepository.child(usuario.id).update(usuario);
  };
};

export default UsuariosRepository;