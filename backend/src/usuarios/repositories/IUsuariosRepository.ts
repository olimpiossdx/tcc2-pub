import ICreteUsuarioDTO from "../dtos/ICreteUsuarioDTO";
import Usuario from "../infra/firebase/entities/Usuario";

export default interface IUsuariosRepository {
  findByAuthId(authId: string): Promise<Usuario | undefined>;
  isUnicKey(acessKey: string): Promise<boolean>;
  create(data: ICreteUsuarioDTO): Promise<void>;
};
