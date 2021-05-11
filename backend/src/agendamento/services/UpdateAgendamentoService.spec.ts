import AppError from '../../shared/erros';
import Agendamento from '../infra/firebase/entities/Agendamento';
import FakeBlocoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';
import UpdateBlocoService from './UpdateAgendamentoService';

let fakeAgendamentoRepository: FakeBlocoRepository;
let createAgendamentoService: CreateAgendamentoService;
let updateAgendamentoService: UpdateBlocoService;

describe('Atualizar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeBlocoRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository);
    updateAgendamentoService = new UpdateBlocoService(fakeAgendamentoRepository);
  });

  it('Bloco atualizado com sucesso.', async () => {

  });
});
