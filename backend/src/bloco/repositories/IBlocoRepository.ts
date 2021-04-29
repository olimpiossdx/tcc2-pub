import ICreteBlocoDTO from '../dtos/ICreteBlocoDTO';
import Usuario from '../infra/firebase/entities/Bloco';

//TODO: alterar paras regras de BLOCO
export default interface IBLocoRepository {
  FindByAuthIdAsync(authId: string): Promise<Usuario | undefined>;
  FindByEmailAsync(email: string): Promise<Usuario | undefined>;
  IsUnicKeyAsync(acessKey: string): Promise<boolean>;
  CreateAsync(data: ICreteBlocoDTO): Promise<void>;
  UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void>;
};
