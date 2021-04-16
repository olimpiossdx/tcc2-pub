import { inject, injectable } from "tsyringe";
import AppError from "../../shared/erros";
import ICreteUsuarioDTO from "../dtos/ICreteUsuarioDTO";
import IUsuariosRepository from "../repositories/IUsuariosRepository";

@injectable()
class CreateUsuarioService {
  constructor(
    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository) { }

  public async execute({ id, nome, email, acessKey, urlImg }: ICreteUsuarioDTO): Promise<void> {
    const existeUsuario = await this.usuariosRepository.findByAuthId(id);

    if (existeUsuario) {
      throw new AppError('Usuário já cadastrado.');
    }

    const isUnicKey = await this.usuariosRepository.isUnicKey(acessKey);

    if (isUnicKey) {
      throw new AppError('Chave de acesso ja cadastrada.');
    }

    await this.usuariosRepository.create({ id, nome, email, acessKey, urlImg });
  }
}

export default CreateUsuarioService;