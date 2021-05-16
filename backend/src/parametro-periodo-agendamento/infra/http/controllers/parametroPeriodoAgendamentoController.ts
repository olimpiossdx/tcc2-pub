import { Request, Response } from 'express';
import { container } from "tsyringe";

import ICreteParametroPeriodoAgendamentoDTO from "../../../dtos/ICreteParametroPeriodoAgendamentoDTO";
import IUpdateParametroPeriodoAgendamentoDTO from "../../../dtos/IUpdateParametroPeriodoAgendamentoDTO";
import CreateParametroPeriodoAgendamentoService from "../../../services/CreateParametroPeriodoAgendamentoService";
import UpdateParametroPeriodoAgendamentoService from '../../../services/UpdateParametroPeriodoAgendamentoService';

export default class ParametroPeriodoAgendamentoController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { periodo } = request.body as ICreteParametroPeriodoAgendamentoDTO;

    const createParametroPeriodoAgendamentoService = container.resolve(CreateParametroPeriodoAgendamentoService);
    await createParametroPeriodoAgendamentoService.ExecuteAsync({ periodo });

    return response.json({ status: 'sucess', message: 'Periodo de agendamento criado com sucesso!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { id, periodo } = request.body as IUpdateParametroPeriodoAgendamentoDTO;

    const updateParametroPeriodoAgendamentoService = container.resolve(UpdateParametroPeriodoAgendamentoService);
    await updateParametroPeriodoAgendamentoService.ExecuteAsync({ id, periodo });

    return response.status(200).json({ status: 'success', message: 'Periodo de agendamento atualizado' });
  };
};
