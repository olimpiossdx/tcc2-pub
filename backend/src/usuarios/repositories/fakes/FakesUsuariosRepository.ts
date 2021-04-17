import ICreteUsuarioDTO from "../../dtos/ICreteUsuarioDTO";
import Usuario from "../../infra/firebase/entities/Usuario";
import IUsuariosRepository from "../IUsuariosRepository";

class FakeUsuariosRepository implements IUsuariosRepository {
  private usuarios: Usuario[] = [];

  public async findByAuthId(authId: string): Promise<Usuario | undefined> {
    const isUsuario = this.usuarios.find(usuario => usuario.id === authId);

    return isUsuario;
  };

  public async isUnicKey(acessKey: string): Promise<boolean> {
    const isUsuario = this.usuarios.find(usuario => usuario.accessKey === acessKey);

    return !!isUsuario;
  };

  public async create(data: ICreteUsuarioDTO): Promise<void> {
    this.usuarios.push(data);
  };
};

export default FakeUsuariosRepository;