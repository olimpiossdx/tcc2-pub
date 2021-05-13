import { isEqual } from 'date-fns';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import FakeBlocoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';
import UpdateAgendamentoService from './UpdateAgendamentoService';

let fakeAgendamentoRepository: FakeBlocoRepository;
let createAgendamentoService: CreateAgendamentoService;
let updateAgendamentoService: UpdateAgendamentoService;

describe('Atualizar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeBlocoRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository);
    updateAgendamentoService = new UpdateAgendamentoService(fakeAgendamentoRepository);
  });

  it('Agendamento atualizado com sucesso.', async () => {
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

      data: new Date(2021, 6, 3, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 3, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 3, 12, 50, 0).getTime()
    };

    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);

    console.log('novoAgendamento', novoAgendamento)

    novoAgendamento.horarioFim = new Date(2021, 6, 3, 12, 51, 0).getTime();

    console.log('novoAgendamentoUPDATE', novoAgendamento)


    expect(await updateAgendamentoService.ExecuteAsync(novoAgendamento)).toHaveProperty('horarioFim', new Date(2021, 6, 3, 12, 51, 0).getTime());
  });

  it('Agendamento não atualizado.', async () => {
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
      horarioFim: new Date(2021, 6, 2, 12, 50, 0).getTime()
    };

    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    await expect(updateAgendamentoService.ExecuteAsync(novoAgendamento)).rejects.toBeInstanceOf(AppError);
  });
});
