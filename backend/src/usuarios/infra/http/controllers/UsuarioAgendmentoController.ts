import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteUsuarioDTO from "../../../dtos/ICreteUsuarioDTO";
import CreateUsuarioService from "../../../services/CreateUsuarioService";
import UpdateUsuarioAccessKeyService from '../../../services/UpdateUsuarioAccessKeyService';

//TODO: alterar para get de agendamentos do usuario
export default class UsuarioAgendmentoController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, urlImg, accessKey } = request.body as ICreteUsuarioDTO;

    const createUsarioService = container.resolve(CreateUsuarioService);
    await createUsarioService.ExecuteAsync({ id, nome, email, urlImg, accessKey });

    return response.json({ status: 'success', message: 'Usuário criado com sucesso!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { accessKey, id } = request.body;

    const updateUsuarioAccessKeyService = container.resolve(UpdateUsuarioAccessKeyService);
    await updateUsuarioAccessKeyService.execute({ id, accessKey });

    return response.status(200).json({ status: 'success', message: 'Chave atualizada' });
  };
};
