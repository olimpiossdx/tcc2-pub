import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UsuarioAgendamentoService from '../../../services/UsuarioAgendamentoService';

export default class UsuarioAgendmentoController {
  async GetAsync(request: Request, response: Response): Promise<Response> {
    const usuarioAgendamentoService = container.resolve(UsuarioAgendamentoService);
    const entities = await usuarioAgendamentoService.ExecuteAsync(request.usuario.id);

    return response.json(entities);
  };
};
