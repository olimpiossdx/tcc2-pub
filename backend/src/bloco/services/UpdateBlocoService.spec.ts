import { uuid } from 'uuidv4';
import AppError from '../../shared/erros';
import ICreteBlocoDTO from '../dtos/ICreteBlocoDTO';
import Bloco from '../infra/firebase/entities/Bloco';
import FakeBlocoRepository from '../repositories/fakes/FakeBlocoRepository';
import CreateBlocoService from './CreateBlocoService';
import UpdateBlocoService from './UpdateBlocoService';

let fakeBlocoRepository: FakeBlocoRepository;
let createBlocoService: CreateBlocoService;
let updateBlocoService: UpdateBlocoService;

describe('Atualizar bloco', () => {
  beforeEach(() => {
    fakeBlocoRepository = new FakeBlocoRepository();
    createBlocoService = new CreateBlocoService(fakeBlocoRepository);
    updateBlocoService = new UpdateBlocoService(fakeBlocoRepository);
  });

  it('Bloco atualizado com sucesso.', async () => {
    var bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    };

    await createBlocoService.ExecuteAsync(bloco);
    const blocoCriado = await fakeBlocoRepository.FindByNomeAsync(bloco.nome) as Bloco;

    blocoCriado.nome = 'atualizando-nome';

    blocoCriado.laboratorios.push({ id: 'teste', nome: 'teste2-laboratorio', numero: 101 });

    await updateBlocoService.execute({
      id: blocoCriado.id,
      nome: blocoCriado.nome,
      laboratorios: blocoCriado.laboratorios
    });

    expect(await fakeBlocoRepository.FindByIdAsync(blocoCriado.id)).toMatchObject(blocoCriado);
  });

  it('Não é possível atualizar laboratório sem bloco', async () => {
    var bloco: Bloco = {
      id: 'teste-bloco1',
      nome: 'teste-bloco',
      laboratorios: [
        {
          id: 'teste-laboratorio',
          nome: 'teste-laboratorio',
          numero: 1
        }
      ]
    };

    bloco.laboratorios.push({ id: 'teste2-laboratorio', nome: 'teste2-laboratorio', numero: 101 });

    await expect(updateBlocoService.execute(bloco)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível atualizar bloco ao menos um laboratório', async () => {
    var bloco: Bloco = {
      id: 'teste-bloco1',
      nome: 'teste-bloco',
      laboratorios: []
    };

    bloco.laboratorios.push({ id: 'teste2-laboratorio', nome: 'teste2-laboratorio', numero: 101 });

    await expect(updateBlocoService.execute(bloco)).rejects.toBeInstanceOf(AppError);
  });
});
