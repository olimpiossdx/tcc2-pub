import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteAgendamentoDTO from "../../../dtos/ICreteAgendamentoDTO";
import IUpdateAgendamentoDTO from "../../../dtos/IUpdateAgendamentoDTO";
import CreateAgendamentoService from "../../../services/CreateAgendamentoService";
import UpdateAgendamentoService from '../../../services/UpdateAgendamentoService';

export default class AgendamentoController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { bloco, laboratorio, data, horarioInicio, horarioFim } = request.body as ICreteAgendamentoDTO;

    const createAgendamentoService = container.resolve(CreateAgendamentoService);
    await createAgendamentoService.ExecuteAsync({ bloco, laboratorio, data, horarioInicio, horarioFim});

    return response.json({ status: 'sucess', message: 'Agendamento criado com sucesso!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { id, bloco, laboratorio, data, horarioInicio, horarioFim } = request.body as IUpdateAgendamentoDTO ;

    const updateUsuarioAccessKeyService = container.resolve(UpdateBlocoService);
    await updateUsuarioAccessKeyService.execute({ id, accessKey });

    return response.status(200).json({ status: 'success', message: 'Agendamento atualizado' });
  };
};
