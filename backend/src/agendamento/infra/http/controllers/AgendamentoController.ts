import { Request, Response } from 'express';
import { container } from "tsyringe";
import Bloco from '../../../../bloco/infra/firebase/entities/Bloco';
import AppError from '../../../../shared/erros';

import IUpdateAgendamentoDTO from "../../../dtos/IUpdateAgendamentoDTO";
import CreateAgendamentoService from "../../../services/CreateAgendamentoService";
import UpdateAgendamentoService from '../../../services/UpdateAgendamentoService';
import BlocosRepository from '../../firebase/repositories/AgendamentoRepository';

export default class AgendamentoController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { blocoId, laboratorioId, data, horarioInicio, horarioFim } = request.body;
    const usuarioId = request.usuario.id;

    const createAgendamentoService = container.resolve(CreateAgendamentoService);
    const blocoRepository = container.resolve(BlocosRepository);
    const entityBloco = await blocoRepository.GetByIdAsync<Bloco>(blocoId);

    if (!entityBloco) {
      throw new AppError("Bloco não encontrado");
    };

    const entityLaboratório = entityBloco.laboratorios.find(laboratorio => laboratorio.id === laboratorioId);

    if (!entityLaboratório) {
      throw new AppError("Bloco não encontrado");
    };

    await createAgendamentoService.ExecuteAsync({ usuarioId, bloco: entityBloco, laboratorio: entityLaboratório, data, horarioInicio, horarioFim });


    return response.json({ status: 'sucess', message: 'Agendamento criado com sucesso!' });
  };

  // TODO: ajustar atualização de registro.
  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { id, bloco, laboratorio, data, horarioInicio, horarioFim } = request.body as IUpdateAgendamentoDTO;
    const usuarioId = request.usuario.id;

    const blocoRepository = container.resolve(BlocosRepository);
    const entityBloco = await blocoRepository.GetByIdAsync<Bloco>(bloco.id);

    if (!entityBloco) {
      throw new AppError("Bloco não encontrado");
    };

    const entityLaboratório = entityBloco.laboratorios.find(entityLaboratorio => entityLaboratorio.id === laboratorio.id);

    if (!entityLaboratório) {
      throw new AppError("laboratório não encontrado");
    };

    const dateFormated = new Date(data).getTime();
    const horarioInicioFormated = new Date(horarioInicio).getTime();
    const horarioFimFormated = new Date(horarioFim).getTime();

    const updateAgendamentoService = container.resolve(UpdateAgendamentoService);
    await updateAgendamentoService.ExecuteAsync({
      id, usuarioId, bloco: entityBloco, laboratorio: entityLaboratório, data: dateFormated, horarioInicio: horarioInicioFormated, horarioFim: horarioFimFormated,
      updated: new Date().getTime(), created: new Date().getTime()
    });

    return response.status(200).json({ status: 'success', message: 'Agendamento atualizado' });
  };
};
