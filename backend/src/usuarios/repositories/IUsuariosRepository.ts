import ICreteUsuarioDTO from '../dtos/ICreteUsuarioDTO';
import Usuario from '../infra/firebase/entities/Usuario';

export default interface IUsuariosRepository {
  FindByAuthIdAsync(authId: string): Promise<Usuario | undefined>;
  FindByEmailAsync(email: string): Promise<Usuario | undefined>;
  IsUnicKeyAsync(acessKey: string): Promise<boolean>;
  CreateAsync(data: ICreteUsuarioDTO): Promise<void>;
  UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void>;
};
