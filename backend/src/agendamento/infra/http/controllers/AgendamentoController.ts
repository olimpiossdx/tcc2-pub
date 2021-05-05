import { Request, Response } from 'express';
import { container } from "tsyringe";
import ICreteAgendamentoDTO from '../../../dtos/ICreteAgendamentoDTO';

import ICreteBlocoDTO from "../../../dtos/ICreteAgendamentoDTO";
import CreateAgendamentoService from "../../../services/CreateAgendamentoService";
import UpdateBlocoService from '../../../services/UpdateAgendamentoService';

//TODO: alterar paras regras de AGENDAMENTO

export default class AgendamentoController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, urlImg, accessKey } = request.body as ICreteAgendamentoDTO;

    const createUsarioService = container.resolve(CreateAgendamentoService);
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