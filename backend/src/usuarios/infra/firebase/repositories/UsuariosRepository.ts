// import { Query } from '@firebase/database-types';
import { database } from 'firebase-admin/lib/database';
import { firebaseDatabase } from '../../../../config/firebase.config';
import ICreteUsuarioDTO from "../../../dtos/ICreteUsuarioDTO";
import IUsuariosRepository from '../../../repositories/IUsuariosRepository';
import Usuario from "../entities/Usuario";

interface objecToArray {
  [key: string]: any;
}

class UsuariosRepository implements IUsuariosRepository {
  private usariosRepository: database.Reference;
  constructor() {
    this.usariosRepository = firebaseDatabase.ref('usuarios');
  }

  async isUnicKey(acessKey: string): Promise<boolean> {
    const response = await this.usariosRepository.orderByChild('acessKey').equalTo(acessKey).get();
    return response.exists();
  }

  async findByAuthId(authId: string): Promise<Usuario | undefined> {
    const response = await this.usariosRepository.orderByChild('id').equalTo(authId).get();
    let usuario: Usuario | undefined = new Usuario();

    if (response.exists()) {
      const usuarioJson = response.toJSON() as objecToArray;
      const hashkey = Object.keys(usuarioJson)[0];
      Object.assign(usuario, {}, usuarioJson[hashkey]);
    } else {
      usuario = undefined;
    }

    return usuario;
  };

  async create(data: ICreteUsuarioDTO): Promise<void> {
    await this.usariosRepository.child(data.id).update(data);
  };

};

export default UsuariosRepository;