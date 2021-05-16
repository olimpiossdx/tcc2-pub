import { isEqual } from 'date-fns';
import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import FakeParametroPeriodoAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import CreateParametroPeriodoAgendamentoService from './CreateParametroPeriodoAgendamentoService';
import UpdateParametroPeriodoAgendamentoService from './UpdateParametroPeriodoAgendamentoService';

let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let createParametroPeriodoAgendamentoService: CreateParametroPeriodoAgendamentoService;
let updateParametroPeriodoAgendamentoService: UpdateParametroPeriodoAgendamentoService;

describe('Atualizar parametro de Periodo para Agendamento', () => {
  beforeEach(() => {
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    createParametroPeriodoAgendamentoService = new CreateParametroPeriodoAgendamentoService(fakeParametroPeriodoAgendamentoRepository);
    updateParametroPeriodoAgendamentoService = new UpdateParametroPeriodoAgendamentoService(fakeParametroPeriodoAgendamentoRepository);
  });

  it('Parametro de periodo para Agendamento  atualizado com sucesso.', async () => {
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

    //   data: new Date(2021, 6, 3, 12, 20, 0).getTime(),
    //   horarioInicio: new Date(2021, 6, 3, 12, 20, 0).getTime(),
    //   horarioFim: new Date(2021, 6, 3, 12, 50, 0).getTime()
    // };

    // const novoAgendamento = await createParametroPeriodoAgendamentoService.ExecuteAsync(agendamento);

    // const agendamentoUpdate = {
    //   ...novoAgendamento,
    //   horarioFim: new Date(2021, 6, 3, 12, 51, 0).getTime()
    // } as ParametroPeriodoAgendamento;


    // expect(await updateParametroPeriodoAgendamentoService.ExecuteAsync(agendamentoUpdate)).toHaveProperty('horarioFim', new Date(2021, 6, 3, 12, 51, 0).getTime());
  });
});
