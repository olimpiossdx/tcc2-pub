import AppError from '../../shared/erros';
import ICreteParametroPeriodoAgendamentoDTO from '../dtos/ICreteParametroPeriodoAgendamentoDTO';
import ParametroPeriodoAgendamento from '../infra/firebase/entities/parametroPeriodoAgendamento';
import FakeParametroPeriodoAgendamentoRepository from '../repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import CreateParametroPeriodoAgendamentoService from './CreateParametroPeriodoAgendamentoService';

let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let createParametroPeriodoAgendamentoService: CreateParametroPeriodoAgendamentoService;

describe('Criar parametro de periodo para agendamento', () => {
  beforeEach(() => {
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    createParametroPeriodoAgendamentoService = new CreateParametroPeriodoAgendamentoService(fakeParametroPeriodoAgendamentoRepository);
  });

  it('Parâmetro de periodo para agendamento criado com sucesso.', async () => {
    const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = { periodo: 50, horarioInicio: new Date(), horarioFim: new Date() };

    const entity = await createParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento);
    expect(await fakeParametroPeriodoAgendamentoRepository.GetByIdAsync<ParametroPeriodoAgendamento>(entity.id)).toMatchObject(entity);
  });

  it('Não é possível criar o mesmo parâmetro mais de uma vez.', async () => {
    const parametroPeriodoAgendamento: ICreteParametroPeriodoAgendamentoDTO = { periodo: 50, horarioInicio: new Date(), horarioFim: new Date() };

    await createParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento);
    await expect(createParametroPeriodoAgendamentoService.ExecuteAsync(parametroPeriodoAgendamento)).rejects.toBeInstanceOf(AppError);
  });
});
