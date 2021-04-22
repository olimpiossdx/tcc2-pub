import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationUsuarioService from '../../../services/AuthenticationUsuarioService';

export default class AuthenticationController {
  async create(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization as string;
    const [, token] = authHeader.split(' ');

    const authenticationUsuarioService = container.resolve(AuthenticationUsuarioService);
    const accessKey = await authenticationUsuarioService.execute({ token });

    return response.json({ accessKey });
  }
}
