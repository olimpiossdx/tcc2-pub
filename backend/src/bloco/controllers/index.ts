import { Request, Response } from 'express';

export default class BlocoController {
  async index(request: Request, response: Response): Promise<Response> {

    const blocos = [{

      id: '1',
      nome: 'Bloco H',

      laboratorios: [
        {
          id: '1@',
          nome: "H 104",
          numero: 104,
          disponivel: false
        },
        {
          id: '12@',
          nome: "H 105",
          numero: 105,
          disponivel: true
        },
      ]
    }];

    return response.json(blocos);
  }
}