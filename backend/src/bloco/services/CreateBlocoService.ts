import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import AppError from '../../shared/erros';
import ICreteBlocoDTO from '../dtos/ICreteBlocoDTO';
import Bloco from '../infra/firebase/entities/Bloco';
import IBlocoRepository from '../repositories/IBlocoRepository';
import { uuid } from 'uuidv4';
import { Laboratorio } from '../../agendamento/infra/firebase/entities/Agendamento';

@injectable()
class CreateBlocoService {
  constructor(
    @inject('BlocoRepository')
    private blocoRepository: IBlocoRepository) { };

  public async ExecuteAsync({ nome, laboratorios }: ICreteBlocoDTO): Promise<Bloco> {
    const bloco = await this.blocoRepository.FindByNomeAsync(nome);

    if (bloco) {
      throw new AppError('Bloco já cadastrado.');
    };

    if (!laboratorios.length) {
      throw new AppError('Bloco deve conter ao menos um laboratório.');
    };
    
    const novoLaboratorios = laboratorios.map(laboratorio => Object.assign({ id: uuid(), nome: laboratorio.nome, numero: laboratorio.numero }, new Laboratorio()));
    const novoBloco = Object.assign({ id: uuid(), nome, laboratorios: novoLaboratorios }, new Bloco());

    return await this.blocoRepository.CreateOrUpdateAsync<Bloco>(novoBloco);
  };
};

export default CreateBlocoService;