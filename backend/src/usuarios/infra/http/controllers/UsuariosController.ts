import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteUsuarioDTO from "../../../dtos/ICreteUsuarioDTO";
import CreateUsuarioService from "../../../services/CreateUsuarioService";

export default class UsuariosController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, urlImg, acessKey } = request.body;

    const createUsarioService = container.resolve(CreateUsuarioService);
    await createUsarioService.execute({ id, nome, email, urlImg, acessKey });
    
    return response.json({ status: 'sucess', message: 'Usuário criado com sucesso!' });
  }
}