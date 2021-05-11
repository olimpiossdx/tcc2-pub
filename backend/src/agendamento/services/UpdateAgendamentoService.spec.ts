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
      let agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome'
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103
      },

      data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 2, 12, 55, 0).getTime(),
    };
    
    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    novoAgendamento.horarioFim =new Date(2021, 6, 2, 12, 51, 0).getTime();  
    await expect(updateAgendamentoService.execute(novoAgendamento)).toMatchObject(agendamento);
  });
  
  it('Bloco atualizado com sucesso.', async () => {
      let agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome'
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103
      },

      data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 2, 12, 55, 0).getTime(),
    };
    
    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    novoAgendamento.horarioFim =new Date(2021, 6, 2, 12, 51, 0).getTime();  
    expect(await fakeAgendamentoRepository.FindAsync(novoAgendamento.id)).toMatchObject(agendamento);
  });
});
