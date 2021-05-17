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
     const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = {
       id:'teste-parametro-periodo-agendamento',
       periodo:50
     };

     const novoParametroPeriodoAgendamento = await createAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento);
     expect(await fakeParametroPeriodoAgendamentoRepository.GetByIdAsync<ParametroPeriodoAgendamento>(novoParametroPeriodoAgendamento.id)).toMatchObject(parametroPeriodoAgendamento);
  });
});
