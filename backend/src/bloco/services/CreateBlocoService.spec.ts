import AppError from '../../shared/erros';
import ICreteBlocoDTO from '../dtos/ICreteBlocoDTO';
import Bloco from '../infra/firebase/entities/Bloco';
import FakeBlocoRepository from '../repositories/fakes/FakeBlocoRepository';
import CreateBlocoService from './CreateBlocoService';

let fakeBlocoRepository: FakeBlocoRepository;
let createBlocoService: CreateBlocoService;

describe('Criar bloco', () => {
  beforeEach(() => {
    fakeBlocoRepository = new FakeBlocoRepository();
    createBlocoService = new CreateBlocoService(fakeBlocoRepository);
  });

  it('Bloco criado com sucesso.', async () => {
    var bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    };

    await createBlocoService.ExecuteAsync(bloco);
    const novoBloco = await fakeBlocoRepository.FindByNomeAsync(bloco.nome) as Bloco;

    expect(await fakeBlocoRepository.FindByIdAsync(novoBloco.id)).toMatchObject(bloco);
  });

  it('Não é possível criar o mesmo bloco mais de uma vez.', async () => {
    var bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    };

    await createBlocoService.ExecuteAsync(bloco);

    await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar bloco sem laboratório.', async () => {
    var bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: []
    };

    await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  });
});
