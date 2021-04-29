import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteBlocoDTO from "../../../dtos/ICreteBlocoDTO";
import CreateBlocoService from "../../../services/CreateBlocoService";
import UpdateBlocoService from '../../../services/UpdateBlocoService';

//TODO: alterar paras regras de BLOCO

export default class BlocosController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, urlImg, accessKey } = request.body as ICreteBlocoDTO;

    const createUsarioService = container.resolve(CreateBlocoService);
    await createUsarioService.ExecuteAsync({ id, nome, email, urlImg, accessKey });

    return response.json({ status: 'sucess', message: 'Usuário criado com sucesso!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { accessKey, id } = request.body;

    const updateUsuarioAccessKeyService = container.resolve(UpdateBlocoService);
    await updateUsuarioAccessKeyService.execute({ id, accessKey });

    return response.status(200).json({ status: 'success', message: 'Chave atualizada' });
  };
};