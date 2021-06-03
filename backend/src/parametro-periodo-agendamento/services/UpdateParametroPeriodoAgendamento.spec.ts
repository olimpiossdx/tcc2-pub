import { isEqual } from 'date-fns';
import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import IUpdateParametroPeriodoAgendamentoDTO from '../dtos/IUpdateParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import FakeParametroPeriodoAgendamentoRepository from '../repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
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
    const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = { periodo: 50, horarioInicio: new Date(), horarioFim: new Date() };

    const { id, horarioInicio, horarioFim } = await createParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento);

    const updateParametroPeriodoAgendamento = {
      id,
      horarioInicio: new Date(horarioInicio),
      horarioFim: new Date(horarioFim),
      periodo: 55
    } as IUpdateParametroPeriodoAgendamentoDTO;

    expect(await updateParametroPeriodoAgendamentoService.ExecuteAsync(updateParametroPeriodoAgendamento)).toHaveProperty('periodo', 55);
  });

  it('Não é possível ataulizar parâmetro de periodo para Agendamento não cadastrado.', async () => {
    const parametroPeriodoAgendamento: IUpdateParametroPeriodoAgendamentoDTO = {
      id: 'teste-parametro-periodo-agendamento',
      periodo: 50, horarioInicio: new Date(), horarioFim: new Date()
    };

    await expect(updateParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento)).rejects.toBeInstanceOf(AppError)
  });
});
