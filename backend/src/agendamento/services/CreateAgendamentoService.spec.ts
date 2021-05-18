import { formatDistance, differenceInMilliseconds } from 'date-fns';
import FakeParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento, { Bloco, Laboratorio } from '../infra/firebase/entities/Agendamento';
import FakeAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';

let fakeAgendamentoRepository: FakeAgendamentoRepository;
let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let createAgendamentoService: CreateAgendamentoService;

describe('Criar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeAgendamentoRepository();
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository, fakeParametroPeriodoAgendamentoRepository);
  });

  it('Agendamento criado com sucesso.', async () => {
    const agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome',
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103,
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 2, 12, 55, 0).getTime(),
    };


    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    expect(await fakeAgendamentoRepository.GetByIdAsync<Agendamento>(novoAgendamento.id)).toMatchObject(agendamento);
  });

  it('Não é possível criar o mesmo agendamento mais de uma vez.', async () => {
    var agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome',
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103,
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 2, 12, 55, 0).getTime(),
    };

    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    await createAgendamentoService.ExecuteAsync(agendamento);

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar o mesmo menor que período mínimo.', async () => {
    const agendamento: ICreteAgendamentoDTO = {
      bloco: {
        id: 'teste-criar-agendamento-bloco',
        nome: 'teste-criar-agendamento-bloco-nome',
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      laboratorio: {
        id: 'teste-criar-agendamento-laboratorio',
        nome: 'teste-criar-agendamento-laboratorio-nome',
        numero: 103,
        created: new Date().getTime(),
        updated: new Date().getTime(),
      },

      data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 2, 12, 22, 0).getTime(),
    };
    
    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });
});
