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

  it('Parâmetro de periodo para Agendamento atualizado com sucesso.', async () => {
     const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = {
       id:'teste-parametro-periodo-agendamento',
       periodo:50
     };

     const novoParametroPeriodoAgendamento = await createAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento);
    
    const updateParametroPeriodoAgendamento= new {
      ...novoParametroPeriodoAgendamento,
      periodo:55
    } as ParametroPeriodoAgendamento;

     expect(await updateParametroPeriodoAgendamentoService.ExecuteAsync(updateParametroPeriodoAgendamento)).toHaveProperty('periodo', 55);
  });
  
    it('Não é possível ataulizar parâmetro de periodo para Agendamento não cadastrado.', async () => {
     const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = {
       id:'teste-parametro-periodo-agendamento',
       periodo:50
     };
     expect(await updateParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento)).toHaveProperty('periodo', 55);
  });
});
