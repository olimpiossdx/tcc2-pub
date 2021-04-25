import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteUsuarioDTO from "../../../dtos/ICreteUsuarioDTO";
import CreateUsuarioService from "../../../services/CreateUsuarioService";
import UpdateUsuarioAccessKeyService from '../../../services/UpdateUsuarioAccessKeyService';

export default class UsuariosController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, urlImg, accessKey } = request.body as ICreteUsuarioDTO;

    const createUsarioService = container.resolve(CreateUsuarioService);
    await createUsarioService.execute({ id, nome, email, urlImg, accessKey });

    return response.json({ status: 'sucess', message: 'Usuário criado com sucesso!' });
  };

  async update(request: Request, response: Response): Promise<Response> {
    const { accessKey, id } = request.body;

    const updateUsuarioAccessKeyService = container.resolve(UpdateUsuarioAccessKeyService);
    await updateUsuarioAccessKeyService.execute({ id, accessKey });

    return response.status(200);
  };
};