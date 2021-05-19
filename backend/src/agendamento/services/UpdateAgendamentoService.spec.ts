import { isEqual } from 'date-fns';
import { uuid } from 'uuidv4';
import ParametroPeriodoAgendamento from '../../parametro-periodo-agendamento/infra/firebase/entities/parametroPeriodoAgendamento';
import FakeParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import AppError from '../../shared/erros';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';
import Agendamento from '../infra/firebase/entities/Agendamento';
import FakeBlocoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from './CreateAgendamentoService';
import UpdateAgendamentoService from './UpdateAgendamentoService';

let fakeAgendamentoRepository: FakeBlocoRepository;
let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let createAgendamentoService: CreateAgendamentoService;
let updateAgendamentoService: UpdateAgendamentoService;

describe('Atualizar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeBlocoRepository();
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository, fakeParametroPeriodoAgendamentoRepository);
    updateAgendamentoService = new UpdateAgendamentoService(fakeAgendamentoRepository, fakeParametroPeriodoAgendamentoRepository);
  });

  it('Agendamento atualizado com sucesso.', async () => {
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

      data: new Date(2021, 6, 3, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 3, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 3, 12, 50, 0).getTime()
    };

    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });
    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);

    const agendamentoUpdate = {
      ...novoAgendamento,
      horarioFim: new Date(2021, 6, 3, 12, 51, 0).getTime()
    } as Agendamento;


    expect(await updateAgendamentoService.ExecuteAsync(agendamentoUpdate)).toHaveProperty('horarioFim', new Date(2021, 6, 3, 12, 51, 0).getTime());
  });

  it('Agendamento não atualizado.', async () => {
    let agendamento: ICreteAgendamentoDTO = {
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

      data: new Date(2021, 6, 5, 12, 20, 0).getTime(),
      horarioInicio: new Date(2021, 6, 5, 12, 20, 0).getTime(),
      horarioFim: new Date(2021, 6, 5, 12, 50, 0).getTime()
    };

    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });
    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);

    await expect(updateAgendamentoService.ExecuteAsync(novoAgendamento)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível atualizar o mesmo menor que período mínimo.', async () => {
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
      horarioFim: new Date(2021, 6, 2, 12, 58, 0).getTime(),
    };

    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 35 });
    const entity = await createAgendamentoService.ExecuteAsync(agendamento);

    const entityUpdate = {
      ...entity,
      horarioFim: new Date(2021, 6, 2, 12, 21, 0).getTime()
    } as Agendamento;

    await expect(updateAgendamentoService.ExecuteAsync(entityUpdate)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível atualizar sem parâmeto de período para agendamento.', async () => {
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
      horarioFim: new Date(2021, 6, 2, 12, 58, 0).getTime(),
    };

    const entityPeriodo = await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync<ParametroPeriodoAgendamento>({ id: uuid(), periodo: 35 });
    const entity = await fakeAgendamentoRepository.CreateOrUpdateAsync<Agendamento>(agendamento);

    const entityUpdate = {
      ...entity,
      horarioFim: new Date(2021, 6, 2, 12, 21, 0).getTime()
    } as Agendamento;

    await fakeParametroPeriodoAgendamentoRepository.DeleteAsync(entityPeriodo.id, {});

    await expect(updateAgendamentoService.ExecuteAsync(entityUpdate)).rejects.toBeInstanceOf(AppError);
  });
});
