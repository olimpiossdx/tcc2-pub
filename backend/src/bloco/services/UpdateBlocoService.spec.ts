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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 6, 3, 20, 13).getTime());

    const date = Date.now();

    let bloco: ICreteBlocoDTO = {
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    };

    const blocoCriado = await createBlocoService.ExecuteAsync(bloco);

    blocoCriado.nome = 'atualizando-nome';

    blocoCriado.laboratorios.push({ id: 'teste', created: date, updated: date, nome: 'teste2-laboratorio', numero: 101 });

    await updateBlocoService.execute(blocoCriado);
    const entity = await fakeBlocoRepository.FindByIdAsync(blocoCriado.id);
    
    expect(entity?.id).toEqual(blocoCriado.id);
  });

  it('Não é possível atualizar laboratório sem bloco', async () => {
    const date = new Date(2021, 6, 3, 20, 13).getTime();

    const bloco = Object.assign({
      id: 'teste-bloco1',
      nome: 'teste-bloco',
      laboratorios: [
        {
          id: 'teste-laboratorio',
          created: date,
          updated: date,
          nome: 'teste-laboratorio',
          numero: 1
        }
      ]
    }, new Bloco()) as Bloco;

    bloco.laboratorios.push({ id: 'teste2-laboratorio', created: date, updated: date, nome: 'teste2-laboratorio', numero: 101 });

    await expect(updateBlocoService.execute(bloco)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível atualizar bloco ao menos um laboratório', async () => {
    const date = Date.now();
    let bloco = Object.assign({
      id: 'teste-bloco1',
      nome: 'teste-bloco',
      laboratorios: [
        {
          id: 'teste-laboratorio',
          created: date,
          updated: date,
          nome: 'teste-laboratorio',
          numero: 100
        }
      ]
    }, new Bloco()) as Bloco;


    bloco = await createBlocoService.ExecuteAsync(bloco);

    bloco = {
      ...bloco,
      laboratorios: []
    };

    await expect(updateBlocoService.execute(bloco)).rejects.toBeInstanceOf(AppError);
  });
});
