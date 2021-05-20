import Agendamento from '../infra/firebase/entities/Agendamento';
import AppError from '../../shared/erros';
import CreateAgendamentoService from './CreateAgendamentoService';
import FakeAgendamentoRepository from '../repositories/fakes/FakeAgendamentoRepository';
import FakeParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import FakeUsuariosRepository from '../../usuarios/repositories/fakes/FakesUsuariosRepository';
import ICreteAgendamentoDTO from '../dtos/ICreteAgendamentoDTO';

let createAgendamentoService: CreateAgendamentoService;
let fakeUsuarioRepository: FakeUsuariosRepository;
let fakeAgendamentoRepository: FakeAgendamentoRepository;
let fakeParametroPeriodoAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;

describe('Criar agendamento', () => {
  beforeEach(() => {
    fakeAgendamentoRepository = new FakeAgendamentoRepository();
    fakeParametroPeriodoAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();
    fakeUsuarioRepository = new FakeUsuariosRepository();
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository, fakeParametroPeriodoAgendamentoRepository, fakeUsuarioRepository);
  });

  it('Agendamento criado com sucesso.', async () => {
    const agendamento: ICreteAgendamentoDTO = {
      usuarioId: 'teste-usuario-id',
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

    await fakeUsuarioRepository.CreateAsync({ id: 'teste-usuario-id', email: 'teste@teste.com.br', accessKey: '14253678', nome: 'Teste usuario', urlImg: 'https://usuarioTeste.png' });

    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    const novoAgendamento = await createAgendamentoService.ExecuteAsync(agendamento);
    expect(await fakeAgendamentoRepository.GetByIdAsync<Agendamento>(novoAgendamento.id)).toMatchObject(agendamento);
  });

  it('Não é possível criar o mesmo agendamento mais de uma vez.', async () => {
    var agendamento: ICreteAgendamentoDTO = {
      usuarioId: 'teste-usuario-id',
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

    await fakeUsuarioRepository.CreateAsync({ id: 'teste-usuario-id', email: 'teste@teste.com.br', accessKey: '14253678', nome: 'Teste usuario', urlImg: 'https://usuarioTeste.png' });
    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    await createAgendamentoService.ExecuteAsync(agendamento);

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar o mesmo menor que período mínimo.', async () => {
    const agendamento: ICreteAgendamentoDTO = {
      usuarioId: 'teste-usuario-id',
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

    await fakeUsuarioRepository.CreateAsync({ id: 'teste-usuario-id', email: 'teste@teste.com.br', accessKey: '14253678', nome: 'Teste usuario', urlImg: 'https://usuarioTeste.png' });
    await fakeParametroPeriodoAgendamentoRepository.CreateOrUpdateAsync({ periodo: 30 });

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });

  it('Não é possível criar agendamento sem período.', async () => {
    const agendamento: ICreteAgendamentoDTO = {
      usuarioId: 'teste-usuario-id',
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
    
    await fakeUsuarioRepository.CreateAsync({ id: 'teste-usuario-id', email: 'teste@teste.com.br', accessKey: '14253678', nome: 'Teste usuario', urlImg: 'https://usuarioTeste.png' });

    await expect(createAgendamentoService.ExecuteAsync(agendamento)).rejects.toBeInstanceOf(AppError);
  });
});
