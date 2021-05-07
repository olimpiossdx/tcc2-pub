import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento, { Bloco, Laboratorio } from '../infra/firebase/entities/Agendamento';
import FakeAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';

let fakeAgendamentoRepository: FakeAgendamentoRepository;
let createAgendamentoService: CreateAgendamentoService;

describe('Criar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeAgendamentoRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository);
  });

  it('Agendamento criado com sucesso.', async () => {
    var agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome'
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103
      },

      data: new Date().toString(),
      horarioInicio: new Date().toString(),
      horarioFim: new Date().toString(),
    };

    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);

    expect(await fakeAgendamentoRepository.FindAsync(novoAgendamento.id)).toMatchObject(agendamento);
  });

  it('Não é possível criar o mesmo agendamento mais de uma vez.', async () => {
    var agendamento: Agendamento = {
      id: 'teste-criar-agendamento-bloco',
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome',
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103
      },

      data: new Date().toString(),
      horarioInicio: new Date().toString(),
      horarioFim: new Date().toString(),
    };

    await createAgendamentoService.ExecuteAsync(agendamento);

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar Agendamento sem bloco.', async () => {
    var agendamento: Agendamento = {
      id: 'teste-criar-agendamento-bloco',
      bloco: {} as Bloco,

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103
      },

      data: new Date().toString(),
      horarioInicio: new Date().toString(),
      horarioFim: new Date().toString(),
    };

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });


  it('Não é possível criar Agendamento sem laboratorio.', async () => {
    var agendamento: Agendamento = {
      id: 'teste-criar-agendamento-bloco',
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome'
      },

      laboratorio: {} as Laboratorio,

      data: new Date().toString(),
      horarioInicio: new Date().toString(),
      horarioFim: new Date().toString(),
    };

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });
});
