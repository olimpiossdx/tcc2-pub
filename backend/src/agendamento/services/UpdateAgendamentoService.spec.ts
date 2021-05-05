import AppError from '../../shared/erros';
import Bloco from '../infra/firebase/entities/Agendamento';
import FakeBlocoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';
import UpdateBlocoService from './UpdateAgendamentoService';

let fakeBlocoRepository: FakeBlocoRepository;
let createBlocoService: CreateAgendamentoService;
let updateBlocoService: UpdateBlocoService;

describe('Atualizar agendamento', () => {
  beforeEach(() => {
    fakeBlocoRepository = new FakeBlocoRepository();
    createBlocoService = new CreateAgendamentoService(fakeBlocoRepository);
    updateBlocoService = new UpdateBlocoService(fakeBlocoRepository);
  });

  it('Bloco atualizado com sucesso.', async () => {
    var bloco: Bloco = {
      id: 'teste-bloco',
      nome: 'teste-bloco',
      laboratorios: [
        {
          id: 'teste-laboratorio',
          nome: 'teste-laboratorio',
          numero: 1
        }
      ]
    };

    await createBlocoService.ExecuteAsync(bloco);

    bloco.nome = 'atualizando-nome';

    bloco.laboratorios.push({ id: 'teste2-laboratorio', nome: 'teste2-laboratorio', numero: 101 });

    await updateBlocoService.execute(bloco);

    expect(await fakeBlocoRepository.FindAsync(bloco.id)).toMatchObject(bloco);
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
