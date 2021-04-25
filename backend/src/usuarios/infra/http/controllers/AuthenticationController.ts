import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationUsuarioService from '../../../services/AuthenticationUsuarioService';

export default class AuthenticationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.usuario;
    
    const authenticationUsuarioService = container.resolve(AuthenticationUsuarioService);
    const accessKey = await authenticationUsuarioService.execute({ email });

    return response.json({ accessKey });
  };
};
