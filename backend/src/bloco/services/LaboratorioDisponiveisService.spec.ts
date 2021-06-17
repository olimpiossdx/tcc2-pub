import FakeAgendamentoRepository from '../../agendamento/repositories/fakes/FakeAgendamentoRepository';
import CreateAgendamentoService from '../../agendamento/services/CreateAgendamentoService';
import FakeParametroPeriodoAgendamentoRepository from '../../parametro-periodo-agendamento/repositories/fakes/FakeParametroPeriodoAgendamentoRepository';
import CreateParametroPeriodoAgendamentoService from '../../parametro-periodo-agendamento/services/CreateParametroPeriodoAgendamentoService';
import FakeUsuariosRepository from '../../usuarios/repositories/fakes/FakesUsuariosRepository';
import CreateUsuarioService from '../../usuarios/services/CreateUsuarioService';
import FakeBlocoRepository from '../repositories/fakes/FakeBlocoRepository';
import CreateBlocoService from './CreateBlocoService';
import BlocoLaboratorioDisponiveisService from './LaboratorioDisponiveisService';

let fakeBlocoRepository: FakeBlocoRepository;
let fakeAgendamentoRepository: FakeAgendamentoRepository;
let fakeParametroAgendamentoRepository: FakeParametroPeriodoAgendamentoRepository;
let fakeUsuariosRepository: FakeUsuariosRepository

let createBlocoService: CreateBlocoService;
let createParametroPeriodoAgendamentoServeice: CreateParametroPeriodoAgendamentoService;
let createAgendamentoService: CreateAgendamentoService;
let createUsuarioService: CreateUsuarioService;
let blocoLaboratorioDisponiveisService: BlocoLaboratorioDisponiveisService;

describe('Laboratórios disponíveis', () => {
  beforeEach(() => {
    fakeUsuariosRepository = new FakeUsuariosRepository();
    fakeBlocoRepository = new FakeBlocoRepository();
    fakeAgendamentoRepository = new FakeAgendamentoRepository();
    fakeParametroAgendamentoRepository = new FakeParametroPeriodoAgendamentoRepository();

    createUsuarioService = new CreateUsuarioService(fakeUsuariosRepository);
    createBlocoService = new CreateBlocoService(fakeBlocoRepository);
    createParametroPeriodoAgendamentoServeice = new CreateParametroPeriodoAgendamentoService(fakeParametroAgendamentoRepository);
    createAgendamentoService = new CreateAgendamentoService(fakeAgendamentoRepository, fakeParametroAgendamentoRepository, fakeUsuariosRepository);
    blocoLaboratorioDisponiveisService = new BlocoLaboratorioDisponiveisService(fakeBlocoRepository, fakeAgendamentoRepository, fakeParametroAgendamentoRepository);

  });

  it('Laboratórios disponíveis com sucesso.', async () => {
    const entityUsuario = await createUsuarioService.ExecuteAsync({ id: 'teste-usuario', nome: 'teste', email: 'teste@email.com', accessKey: 'teste-key', urlImg: 'http://teste.com' });
    const entityParametroPeriodoAgendamento = await createParametroPeriodoAgendamentoServeice.ExecuteAsync({
      periodo: 50, horarioInicio: new Date(2021, 5, 10, 8), horarioFim: new Date(2021, 5, 10, 23, 0)
    });

    const entityBloco = await createBlocoService.ExecuteAsync({
      nome: 'teste-bloco',
      laboratorios: [{
        nome: 'teste-laboratorio',
        numero: 1
      }]
    });

    const entities = await blocoLaboratorioDisponiveisService.ExecuteAsync({ blocoId: entityBloco.id, laboratorioId: entityBloco.laboratorios[0].id, data: new Date(2021, 5, 10, 23, 0).toString() });
    console.log('entities', entities);
    expect(entities).toMatchObject([
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T11:50:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T12:40:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T13:30:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T14:20:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T15:10:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T16:00:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T16:50:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T17:40:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T18:30:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T19:20:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T20:10:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T21:00:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T21:50:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T22:40:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-10T23:30:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-11T00:20:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-11T01:10:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-11T02:00:00.000Z'
      },
      {
        blocoId: '7cccd854-8779-4ae3-ad7e-af865dcbacb8',
        laboratorioNome: 'teste-laboratorio',
        data: '2021-06-11T02:00:00.000Z',
        horarioInicio: '2021-06-11T02:50:00.000Z',
        horarioFim: '2021-06-11T02:50:00.000Z'
      }
    ]);
  });

  // it('Não é possível listar laboratórios disponíveis sem parâmetro', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: [{
  //       nome: 'teste-laboratorio',
  //       numero: 1
  //     }]
  //   };

  //   await createBlocoService.ExecuteAsync(bloco);

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });

  // it('Não é possível listar laboratórios disponíveis sem bloco.', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: []
  //   };

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });

  // it('Não é possível listar laboratórios disponíveis sem laboratório.', async () => {
  //   var bloco: ICreteBlocoDTO = {
  //     nome: 'teste-bloco',
  //     laboratorios: []
  //   };

  //   await expect(createBlocoService.ExecuteAsync(bloco)).rejects.toBeInstanceOf(AppError);
  // });
});
