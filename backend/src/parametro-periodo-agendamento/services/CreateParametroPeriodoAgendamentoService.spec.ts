import { formatDistance, differenceInMilliseconds } from 'date-fns';
import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import FakeParametroPeriodoAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateParametroPeriodoAgendamentoService from './CreateParametroPeriodoAgendamentoService';

let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let createParametroPeriodoAgendamentoService: CreateParametroPeriodoAgendamentoService;

describe('Criar parametro de periodo para agendamento', () => {
  beforeEach(() => {
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    createParametroPeriodoAgendamentoService = new CreateParametroPeriodoAgendamentoService(fakeParametroPeriodoAgendamentoRepository);
  });

  it('Parametro de periodo para agendamento criado com sucesso.', async () => {
    // TODO: ajustar teste
    // const agendamento: ICreteParametroPeriodoAgendamentoDTO = {
    //   bloco: {
    //     id: 'teste-criar-agendamento-bloco',
    //     nome: 'teste-criar-agendamento-bloco-nome'
    //   },

    //   laboratorio: {
    //     id: 'teste-criar-agendamento-laboratorio',
    //     nome: 'teste-criar-agendamento-laboratorio-nome',
    //     numero: 103
    //   },

    //   data: new Date(2021, 6, 2, 12, 20, 0).getTime(),
    //   horarioInicio: new Date(2021, 6, 2, 12, 20, 0).getTime(),
    //   horarioFim: new Date(2021, 6, 2, 12, 55, 0).getTime(),
    // };

    // const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    // expect(await fakeAgendamentoRepository.GetByIdAsync<ParametroPeriodoAgendamento>(novoAgendamento.id)).toMatchObject(agendamento);
  });
});
