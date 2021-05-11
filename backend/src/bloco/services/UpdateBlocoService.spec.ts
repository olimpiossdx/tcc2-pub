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
    let bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    };

    const blocoCriado = await createBlocoService.ExecuteAsync(bloco);

    blocoCriado.nome = 'atualizando-nome';

    blocoCriado.laboratorios.push({ id: 'teste', nome: 'teste2-laboratorio', numero: 101 });

    await updateBlocoService.execute(blocoCriado);

    expect(await fakeBlocoRepository.FindByIdAsync(blocoCriado.id)).toMatchObject(blocoCriado);
  });

  it('Não é possível atualizar laboratório sem bloco', async () => {
    const bloco: Bloco = {
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
    let bloco: Bloco = {
      id: 'teste-bloco1',
      nome: 'teste-bloco',
      laboratorios: [{ id: 'teste', nome: 'teste', numero: 100 }]
    };

    bloco = await createBlocoService.ExecuteAsync(bloco);

    bloco = {
      ...bloco,
      laboratorios: []
    };

    await expect(updateBlocoService.execute(bloco)).rejects.toBeInstanceOf(AppError);
  });
});
