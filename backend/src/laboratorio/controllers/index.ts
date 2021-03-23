import { Request, Response } from 'express';

export default class LaboratorioController {
  async index(request: Request, response: Response): Promise<Response> {
    const data = new Date();

    const laboratorios = [{
      id: '1',
      nome: 'b214',
      isAvailable: false
    }];

    const blocos = [{
      id: '1',
      nome: 'B'
    }];

    return response.json({ laboratorios, blocos });
  }
}