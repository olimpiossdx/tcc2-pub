import ICreteBlocoDTO from '../../dtos/ICreteBlocoDTO';
import Usuario from '../../infra/firebase/entities/Bloco';
import IUsuariosRepository from '../IBlocoRepository';

//TODO: alterar paras regras de BLOCO
class FakeBlocoRepository implements IUsuariosRepository {
  private usuarios: Usuario[] = [];

  public async FindByAuthIdAsync(authId: string): Promise<Usuario | undefined> {
    const isUsuario = this.usuarios.find(usuario => usuario.id === authId);

    return isUsuario;
  };

  public async IsUnicKeyAsync(acessKey: string): Promise<boolean> {
    const isUsuario = this.usuarios.find(usuario => usuario.accessKey === acessKey);

    return !!isUsuario;
  };

  public async CreateAsync(data: ICreteBlocoDTO): Promise<void> {
    this.usuarios.push(data);
  };

  public async FindByEmailAsync(email: string): Promise<Usuario | undefined> {
    return this.usuarios.find(usuario => usuario.email === email);
  };

  public async UpdateAccessKeyAsync(id: string, accessKey: string): Promise<void> {
    const indexUsuario = this.usuarios.findIndex(usuario => usuario.id === id);
    this.usuarios[indexUsuario].accessKey = accessKey;
  };
};

export default FakeBlocoRepository;