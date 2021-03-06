import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ICreteBlocoDTO from '../../../dtos/ICreteBlocoDTO';
import IUpdateBlocoDTO from '../../../dtos/IUpdateBlocoDTO';
import CreateBlocoService from '../../../services/CreateBlocoService';
import LaboratorioDisponiveisService from '../../../services/LaboratorioDisponiveisService';
import UpdateBlocoService from '../../../services/UpdateBlocoService';
import BlocoRepository from '../../firebase/repositories/BlocoRepository';

export default class BlocosController {
  async GetAsync(request: Request, response: Response): Promise<Response> {
    const blocoRepository = container.resolve(BlocoRepository);
    const entities = await blocoRepository.GetAsync();
    return response.json(entities);
  };

  async CreateAsync(request: Request, response: Response): Promise<Response> {
    const { nome, laboratorios } = request.body as ICreteBlocoDTO;

    const createBlocoService = container.resolve(CreateBlocoService);
    await createBlocoService.ExecuteAsync({ nome, laboratorios });

    return response.json({ status: 'success', message: 'Bloco criado!' });
  };

  async UpdateAsync(request: Request, response: Response): Promise<Response> {
    const { id, nome, laboratorios } = request.body as IUpdateBlocoDTO;

    const updateUsuarioAccessKeyService = container.resolve(UpdateBlocoService);
    await updateUsuarioAccessKeyService.execute({ id, nome, laboratorios });

    return response.json({ status: 'success', message: 'Bloco atualizado!' });
  };

  async GetLaboratorioDisponiveisAsync(request: Request, response: Response): Promise<Response> {
    const { blocoId, laboratorioId, data } = request.body;

    const laboratorioDisponiveisService = container.resolve(LaboratorioDisponiveisService);
    const entities = await laboratorioDisponiveisService.ExecuteAsync({ blocoId, laboratorioId, data });
    
    return response.json(entities);
  };
};