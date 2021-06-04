import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreteParametroPeriodoAgendamentoDTO from '../../../dtos/ICreteParametroPeriodoAgendamentoDTO';
import IUpdateParametroPeriodoAgendamentoDTO from '../../../dtos/IUpdateParametroPeriodoAgendamentoDTO';
import CreateParametroPeriodoAgendamentoService from '../../../services/CreateParametroPeriodoAgendamentoService';
import UpdateParametroPeriodoAgendamentoService from '../../../services/UpdateParametroPeriodoAgendamentoService';
import ParametroPeriodoAgendamentoRepository from '../../firebase/repositories/parametroPeriodoAgendamentoRepository';


export default class ParametroPeriodoAgendamentoController {
  async GetAsync(request: Request, response: Response): Promise<Response> {
    const parametroPeriodoAgendamentoRepository = container.resolve(ParametroPeriodoAgendamentoRepository);
    const entity = await parametroPeriodoAgendamentoRepository.GetAsync();

    return response.json(entity);
  };

  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { periodo, horarioInicio, horarioFim } = request.body as ICreteParametroPeriodoAgendamentoDTO;

    const createParametroPeriodoAgendamentoService = container.resolve(CreateParametroPeriodoAgendamentoService);
    await createParametroPeriodoAgendamentoService.ExecuteAsync({ periodo, horarioInicio: new Date(horarioInicio), horarioFim: new Date(horarioFim) });

    return response.json({ status: 'sucess', message: 'Periodo de agendamento criado com sucesso!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { id, periodo, horarioInicio, horarioFim } = request.body as IUpdateParametroPeriodoAgendamentoDTO;

    const updateParametroPeriodoAgendamentoService = container.resolve(UpdateParametroPeriodoAgendamentoService);
    await updateParametroPeriodoAgendamentoService.ExecuteAsync({ id, periodo, horarioInicio: new Date(horarioInicio), horarioFim: new Date(horarioFim) });

    return response.status(200).json({ status: 'success', message: 'Periodo de agendamento atualizado' });
  };
};
