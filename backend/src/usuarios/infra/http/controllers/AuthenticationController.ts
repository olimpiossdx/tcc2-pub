import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationUsuarioService from '../../../services/AuthenticationUsuarioService';

export default class AuthenticationController {
  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { email } = request.usuario;

    const authenticationUsuarioService = container.resolve(AuthenticationUsuarioService);
    const accessKey = await authenticationUsuarioService.ExecuteAsync({ email });

    return response.json({ accessKey });
  };
};
